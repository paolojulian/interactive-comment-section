import { NextApiRequest } from 'next';
import ReplyService from '../../../../helpers/api/services/ReplyService';

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
};

export default handler;
