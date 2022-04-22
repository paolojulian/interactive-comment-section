import { saveJsonFile } from '../../../../helpers/api/saveJsonFile';
import CommentService from '../../../../helpers/api/services/CommentService';

let db = require('/data/db.json');

const onVote = (req, res) => {
  const id = Number(req.query.id);
  const voted = Number(req.body.voted);

  const commentToUpdate = db.comments.find((comment) => comment.id === id);
  switch (voted) {
    case 1:
      if (commentToUpdate.voted >= 1) {
        return res.status(422).json({ message: 'Cannot upvote anymore.' });
      }
      break;
    case -1:
      if (commentToUpdate.voted <= -1) {
        return res.status(422).json({ message: 'Cannot downvote anymore.' });
      }
      break;
    default:
      return res.status(422).json({ message: 'Invalid parameters.' });
  }
  commentToUpdate.voted += voted;
  commentToUpdate.score += voted;
  saveJsonFile(db);

  return res.status(200).json(commentToUpdate);
};

/**
 * Handler
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
const handler = async (req, res) => {
  const id = req.query.id;

  switch (req.method) {
    case 'DELETE':
      const response = await CommentService.deleteComment(id);
      if (!response.ok) {
        return res.status(500).send();
      }
      return res.status(204).send();
    default:
      break;
  }

  if (req.method === 'PUT') {
    if (req.body.voted !== undefined) {
      return onVote(req, res);
    }

    const commentToUpdate = db.comments.find((comment) => comment.id === id);
    commentToUpdate.content = req.body.content;
    saveJsonFile(db);

    return res.status(200).json(db);
  }

  return res.status(200).send();
};

export default handler;
