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
      const createdUser = await Comment.create({
        content,
        user: currentUser._id,
      });
      const populatedUser = await createdUser.populate('user', ['username', 'image']);
      return new ResponseHandler(true, populatedUser);
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
      await User.deleteById(id);
      return new ResponseHandler(true);
    } catch (error) {
      console.error(error);
      return new ResponseHandler(false, error);
    }
  };

  /**
   * Fetch the list of comments
   *
   * @returns { Promise<Object> }
   */
  const fetchComments = async () => {
    try {
      const comments = await Comment.find().limit(20).populate('user', ['username', 'image']);
      return new ResponseHandler(true, comments);
    } catch (error) {
      return new ResponseHandler(true, error);
    }
  };

  return {
    addComment,
    deleteComment,
    fetchComments,
  };
})();

export default CommentService;
