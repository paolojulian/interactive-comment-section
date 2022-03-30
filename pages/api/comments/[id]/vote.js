import { NextApiRequest } from 'next';
import { saveJsonFile } from '../../../../helpers/api/saveJsonFile';

let db = require('/data/db.json');

/**
 * Handler
 *
 * @param {NextApiRequest} req
 * @param {*} res
 */
const handler = async (req, res) => {
  const id = Number(req.query.id);
  const { count } = req.body;

  const commentToUpdate = db.comments.find((comment) => comment.id === id);
  switch (count) {
    case 1:
      if (commentToUpdate.voted >= 1) {
        return res.status(422).json({ message: 'Cannot upvote anymore.' });
      }
      break;
    case -1:
      if (commentToUpdate.voted <= -1) {
        return res.status(422).json({ message: 'Cannot upvote anymore.' });
      }
      break;
    default:
      return res.status(422).json({ message: 'Invalid parameters.' })
  }
  commentToUpdate.voted = count;
  saveJsonFile(db);

  return res.status(200).json(commentToUpdate);
};

export default handler;
