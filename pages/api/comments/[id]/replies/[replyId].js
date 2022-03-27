import { saveJsonFile } from '../../../../../helpers/api/saveJsonFile';

let db = require('/data/db.json');

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
    replyToUpdate.content = req.body.content;

    saveJsonFile(db);

    return res.status(200).json(db);
  }

  return res.status(200).send();
};

export default handler;
