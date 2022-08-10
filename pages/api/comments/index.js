import { connectToDatabase } from '../../../helpers/api/mongodb';
import CommentService from '../../../helpers/api/services/CommentService';

const handler = async (req, res) => {
  const { method } = req;

  await connectToDatabase();

  switch (method) {
    case 'GET':
      const fetchCommentsResponse = await CommentService.fetchComments();
      console.log('test');

      return res
        .setHeader('Cache-Control', 'no-store')
        .status(fetchCommentsResponse.ok ? 200 : 500)
        .json(fetchCommentsResponse.data);

    case 'POST':
      const addCommentResponse = await CommentService.addComment(req.body);

      return res.status(addCommentResponse.ok ? 200 : 500).json(addCommentResponse.data);

    default:
      return res.status(404).send();
  }
};

export default handler;
