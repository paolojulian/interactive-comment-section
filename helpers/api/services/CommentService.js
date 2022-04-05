import Comment from '../models/Comment';
import User from '../models/User';

const CommentService = (() => {
  /**
   * Add a comment
   */
  const addComment = async ({ content }) => {
    const currentUser = await User.findCurrentUser();
    try {
      const createdUser = await Comment.create({
        content,
        user: currentUser._id,
      });
      const populatedUser = await createdUser.populate('user', ['username', 'image']);
      return { ok: true, data: populatedUser };
    } catch (error) {
      return { ok: false, error };
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
      return { ok: true, data: comments };
    } catch (error) {
      return { ok: false, error };
    }
  };

  return {
    addComment,
    fetchComments,
  };
})();

export default CommentService;
