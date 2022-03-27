import { NextApiRequest } from 'next';
import { generateAutoIncrementId } from '../../../../helpers/api/general';
import { saveJsonFile } from '../../../../helpers/api/saveJsonFile';

let db = require('/data/db.json');

const onAdd = (comment, payload) => {
  const { replyingTo, content } = payload;

  const reply = {
    id: null,
    content: content,
    createdAt: 'now',
    score: 0,
    user: db.currentUser,
    replyingTo: Number(replyingTo),
  };

  reply.id = generateAutoIncrementId(comment.replies);
  comment.replies.push(reply);

  saveJsonFile(db);

  return {
    ...reply,
    replyingTo: db.users.find((user) => user.id === reply.replyingTo),
    user: db.users.find((user) => user.id === reply.user),
  };
}

/**
 * Handler
 *
 * @param {NextApiRequest} req
 * @param {*} res
 */
const handler = async (req, res) => {
  const commentId = Number(req.query.id);
  const comment = db.comments.find((comment) => comment.id === commentId);

  if (req.method === 'POST') {
    const reply = onAdd(comment, req.body);

    return res.status(201).json(reply);
  }

  return res.status(200).send();
};

export default handler;
