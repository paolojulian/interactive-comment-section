import ReplyService from '../../../../../helpers/api/services/ReplyService';

/**
 * Handler
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
const handler = async (req, res) => {
  const commentId = req.query.id;
  const id = req.query.replyId;

  switch (req.method) {
    case 'DELETE':
      const deleteReplyResponse = await ReplyService.deleteReply(id, commentId);

      if (!deleteReplyResponse.ok) {
        return res.status(500).json(deleteReplyResponse.data);
      }

      return res.status(204).send();
    
    case 'PUT':
      if (req.body.voted !== undefined) {
        const voteComment = await ReplyService.voteReply(id, req.body);
        return res.status(voteComment.ok ? 200 : 500).json(voteComment.data);
      }

      const updateReplyResponse = await ReplyService.updateReply(id, req.body);

      return res.status(200).json(updateReplyResponse.data);
    default:
      return res.status(404).send();
  }
};

export default handler;
