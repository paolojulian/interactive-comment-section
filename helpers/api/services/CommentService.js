import Comment from '../models/Comment';
import User from '../models/User';
import ResponseHandler from '../../../helpers/response-handler';

const CommentService = (() => {
  /**
   * Add a comment
   *
   * @returns { Promise<ResponseHandler> }
   */
  const addComment = async ({ content }) => {
    const currentUser = await User.findCurrentUser();
    try {
      const createdComment = await Comment.create({
        content,
        user: currentUser._id,
      });
      const populatedComment = await createdComment.populate('user', ['username', 'image']);
      return new ResponseHandler(true, populatedComment);
    } catch (error) {
      return new ResponseHandler(false, error);
    }
  };

  /**
   * Delete a comment
   *
   * @param { String } id
   * @returns { Promise<ResponseHandler> }
   */
  const deleteComment = async (id) => {
    try {
      const response = await Comment.deleteOne({ _id: id });
      if (!response.acknowledged) {
        throw 'Server error';
      }
      return new ResponseHandler(true);
    } catch (error) {
      return new ResponseHandler(false, error);
    }
  };

  /**
   * Fetch the list of comments
   *
   * @returns { Promise<ResponseHandler> }
   */
  const fetchComments = async () => {
    try {
      const comments = await Comment.find()
        .limit(20)
        .populate('user', ['username', 'image'])
        .populate({
          path: 'replies',
          populate: [
            {
              path: 'user',
              model: 'User',
            },
            {
              path: 'replyingTo',
              model: 'User',
            },
          ],
        });
      return new ResponseHandler(true, comments);
    } catch (error) {
      return new ResponseHandler(false, error);
    }
  };

  /**
   * Update a comment
   *
   * @returns { Promise<ResponseHandler> }
   */
  const updateComment = async (id, data) => {
    const filter = { _id: id };
    const updateData = {
      content: data.content,
    };
    try {
      const updatedComment = await Comment.findOneAndUpdate(filter, updateData, { new: true });
      return new ResponseHandler(true, updatedComment);
    } catch (error) {
      return new ResponseHandler(false, error);
    }
  };

  return {
    addComment,
    deleteComment,
    fetchComments,
    updateComment,
  };
})();

export default CommentService;
