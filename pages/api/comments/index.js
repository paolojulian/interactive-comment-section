import { connectToDatabase } from '../../../helpers/api/mongodb';
import CommentService from '../../../helpers/api/services/CommentService';

const handler = async (req, res) => {
  const { method } = req;

  await connectToDatabase();

  switch (method) {
    case 'GET':
      const fetchCommentsResponse = await CommentService.fetchComments();
      if (!fetchCommentsResponse.ok) {
        return res.status(500).json(fetchCommentsResponse.error);
      }
      return res.status(200).json(fetchCommentsResponse.data);

    case 'POST':
      const addCommentResponse = await CommentService.addComment(req.body);
      if (!addCommentResponse.ok) {
        return res.status(500).json(addCommentResponse.error);
      }
      return res.status(200).json(addCommentResponse.data);

    default:
      return res.status(404).send();
  }
};

export default handler;
