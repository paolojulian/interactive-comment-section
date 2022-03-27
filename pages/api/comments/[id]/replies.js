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
  const commentId = Number(req.query.id);
  const comment = db.comments.find((comment) => comment.id === commentId);
  const { replyingTo, content } = req.body;

  const reply = {
    id: null,
    content: content,
    createdAt: 'now',
    score: 0,
    user: db.currentUser,
    replyingTo: Number(replyingTo),
  };

  reply.id = comment.replies.length ? Math.max(...comment.replies.map((x) => x.id)) + 1 : 1;
  comment.replies.push(reply);

  saveJsonFile(db);

  const replyToReturn = {
    ...reply,
    replyingTo: db.users.find((user) => user.id === reply.replyingTo),
    user: db.users.find((user) => user.id === reply.user),
  };

  return res.status(201).json(replyToReturn);
};

export default handler;
