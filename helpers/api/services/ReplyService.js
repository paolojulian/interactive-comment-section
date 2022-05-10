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
  const addReply = async (commentId, { content, replyingTo }) => {
    const currentUser = await User.findCurrentUser();
    try {
      const comment = await Comment.findOne({ _id: commentId });
      if (!comment) {
        throw comment;
      }
      const createdReply = await Reply.create({
        content,
        replyingTo: replyingTo,
        user: currentUser._id,
      });
      const populatedReply = await Reply.findOne({ _id: createdReply._id })
        .populate('user', ['username', 'image'])
        .populate('replyingTo');
      comment.replies.push(createdReply);
      comment.save();
      return new ResponseHandler(true, populatedReply);
    } catch (error) {
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
      await Comment.updateOne(
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

  const voteReply = async (id, { voted }) => {
    const replyToUpdate = await Reply.findOne({ _id: id });
    switch (voted) {
      case 1:
        if (replyToUpdate.voted >= 1) {
          return new ResponseHandler(false, { message: 'Cannot upvote anymore'});
        }
        break;
      case -1:
        if (replyToUpdate.voted <= -1) {
          return new ResponseHandler(false, { message: 'Cannot downvote anymore'});
        }
        break; default:
        throw 'Invalid parameters';
    }

    const updateData = {
      voted: replyToUpdate.voted + voted,
      score: replyToUpdate.score + voted
    };
    try {
      const updatedComment = await Reply.findOneAndUpdate({ _id: id }, updateData, { new: true });
      return new ResponseHandler(true, updatedComment);
    } catch (error) {
      return new ResponseHandler(false, error);
    }
  };

  /**
   * Update a reply
   *
   * @returns { Promise<ResponseHandler> }
   */
  const updateReply = async (id, { content }) => {
    const updateData = {
      content,
    };
    try {
      const updatedReply = await Reply.findOneAndUpdate({ _id: id }, updateData, { new: true });
      return new ResponseHandler(true, updatedReply);
    } catch (error) {
      return new ResponseHandler(false, error);
    }
  };

  return {
    addReply,
    deleteReply,
    updateReply,
    voteReply
  };
})();

export default ReplyService;
