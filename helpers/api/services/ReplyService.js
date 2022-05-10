import Comment from '../models/Comment';
import Reply from '../models/Reply';
import User from '../models/User';
import ResponseHandler from '../../response-handler';

const ReplyService = (() => {
  /**
   * Add a reply
   *
   * @returns { Promise<ResponseHandler> }
   */
  const addReply = async (commentId, { content }) => {
    const currentUser = await User.findCurrentUser();
    try {
      const comment = await Comment.findOne({ _id: commentId });
      if (!comment) {
        throw comment;
      }
      const createdReply = await Reply.create({
        content,
        replyingTo: comment.user,
        user: currentUser._id,
      });
      const populatedReply = await Reply.findOne({ _id: createdReply._id })
        .populate('user', ['username', 'image'])
        .populate('replyingTo');
      comment.replies.push(createdReply);
      comment.save();
      return new ResponseHandler(true, populatedReply);
    } catch (error) {
      console.log(error);
      return new ResponseHandler(false, error);
    }
  };

  /**
   * Delete a reply
   *
   * @param { String } id
   * @returns { Promise<ResponseHandler> }
   */
  const deleteReply = async (id, commentId) => {
    try {
      const updateComment = await Comment.updateOne(
        { _id: commentId },
        {
          $pullAll: {
            replies: [id],
          },
        }
      );
      const response = await Reply.deleteOne({ _id: id });
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
      const comments = await Comment.find().limit(20).populate('user', ['username', 'image']);
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
    addReply,
    deleteReply,
    fetchComments,
    updateComment,
  };
})();

export default ReplyService;
