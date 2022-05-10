import { NextApiRequest } from 'next';
import { generateAutoIncrementId } from '../../../../helpers/api/general';
import { saveJsonFile } from '../../../../helpers/api/saveJsonFile';
import ReplyService from '../../../../helpers/api/services/ReplyService';

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
  const commentId = req.query.id;

  switch (req.method) {
    case 'POST':
      const addReplyResponse = await ReplyService.addReply(commentId, req.body);

      return res.status(addReplyResponse.ok ? 200 : 500).json(addReplyResponse.data);
    default:
      return res.status(404).send();
  }
  if (req.method === 'POST') {
    const reply = onAdd(comment, req.body);

    return res.status(201).json(reply);
  }

  return res.status(200).send();
};

export default handler;
