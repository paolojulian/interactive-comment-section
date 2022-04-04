import { saveJsonFile } from '../../../../../helpers/api/saveJsonFile';

let db = require('/data/db.json');

const onVote = (replyToUpdate, voted) => {
  switch (voted) {
    case 1:
      if (replyToUpdate.voted >= 1) {
        return {
          ok: false,
          message: 'Cannot upvote anymore.',
        };
      }
      break;
    case -1:
      if (replyToUpdate.voted <= -1) {
        return {
          ok: false,
          message: 'Cannot downvote anymore.',
        };
      }
      break;
    default:
      return {
        ok: false,
        message: 'Invalid parameters.',
      };
  }
  replyToUpdate.voted += voted;
  replyToUpdate.score += voted;

  return {
    ok: true,
  };
};

/**
 * Handler
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
const handler = async (req, res) => {
  const commentId = Number(req.query.id);
  const comment = db.comments.find((comment) => comment.id === commentId);

  const id = Number(req.query.replyId);

  if (req.method === 'DELETE') {
    comment.replies.forEach((reply, i) => {
      if (reply.id === id) {
        comment.replies.splice(i, 1);
      }
    });
    saveJsonFile(db);

    return res.status(204).send();
  }

  if (req.method === 'PUT') {
    const replyToUpdate = comment.replies.find((reply) => reply.id === id);

    // On update vote
    if (req.body.voted !== undefined) {
      const response = onVote(replyToUpdate, Number(req.body.voted));
      if (!response.ok) {
        return res.status(422).json(response.message);
      }
    } else {
      replyToUpdate.content = req.body.content;
    }

    saveJsonFile(db);

    return res.status(200).json(db);
  }

  return res.status(200).send();
};

export default handler;
