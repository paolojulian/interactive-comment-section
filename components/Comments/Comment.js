import { useEffect, useRef, useState, useCallback } from 'react';

import AddReply from './AddReply';
import Card from '../Card';
import DeleteComment from './DeleteComment';
import DeleteIcon from '../Icons/DeleteIcon';
import EditIcon from '../Icons/EditIcon';
import MinusIcon from '../Icons/MinusIcon';
import PlusIcon from '../Icons/PlusIcon';
import ProfilePicture from '../ProfilePicture';
import ReplyIcon from '../Icons/ReplyIcon';
import TextArea from '../TextArea';
import Button from '../Button';
import { useCommentsContext } from '../../context/CommentsContext';

const voteTypes = {
  upvote: 1,
  downvote: -1,
};

export default function Comment({
  replies = [],
  replyingTo = null,
  isReply = false,
  id,
  content,
  createdAt,
  currentUser,
  replyId,
  score,
  username,
  userImg,
  userId,
  voted,
}) {
  const editRef = useRef(null);
  const [showAddReply, setShowAddReply] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editedMsg, setEditedMsg] = useState(content);
  const isCurrentUser = currentUser && currentUser.id === userId;
  const { deleteCommentApi, updateCommentApi, addReplyApi, deleteReplyApi, updateReplyApi, voteApi, voteReplyApi } =
    useCommentsContext();

  useEffect(() => {
    if (showEdit && editRef?.current) {
      const trueContentLength = content.length;
      editRef.current.focus();
      editRef.current.setSelectionRange(trueContentLength, trueContentLength);
      editRef.current.scrollTop = editRef.current.scrollHeight;
    }
  }, [showEdit, content.length, replyingTo]);

  const onEdit = () => {
    setShowEdit((prev) => !prev);
    setEditedMsg(content);
  };

  const onUpdateAsync = async () => {
    if (!isReply) {
      const response = await updateCommentApi.request(id, { content: editedMsg });
      if (!response.ok) return;

      return setShowEdit((prev) => !prev);
    }

    // Update a reply
    const response = await updateReplyApi.request(id, replyId, { content: editedMsg });
    if (!response.ok) return;

    return setShowEdit((prev) => !prev);
  };

  const onDelete = () => {
    setShowDelete(!showDelete);
  };

  const onDeleteAsync = async () => {
    if (!isReply) {
      const response = await deleteCommentApi.request(id);
      if (!response.ok) return;

      return setShowDelete((prev) => !prev);
    }

    // Delete a reply
    const response = await deleteReplyApi.request(id, replyId);
    if (!response.ok) return;

    return setShowDelete((prev) => !prev);
  };

  const onReply = () => {
    setShowAddReply((prev) => !prev);
  };

  const onReplyAsync = async (content) => {
    const response = await addReplyApi.request(id, {
      content,
      replyingTo: userId,
    });
    if (response.ok) {
      setShowAddReply((prev) => !prev);
    }
  };

  /**
   * @param {1|-1} payload
   */
  const onVote = useCallback(
    async (payload) => {
      if (voteApi.isLoading) return;

      switch (payload) {
        case voteTypes.upvote:
          if (voted >= 1) return; // Cannot upvote if already upvoted
          break;
        case voteTypes.downvote:
          if (voted <= -1) return; // Cannot downvote if already downvoted
          break;
      }

      if (isReply) {
        const response = await voteReplyApi.request(id, replyId, { voted: payload });
        if (response.ok) {
        }
        return;
      }

      const response = await voteApi.request(id, { voted: payload });
      if (response.ok) {
      }
      return;
    },
    [voted, voteApi, voteReplyApi, id, replyId, isReply]
  );

  return (
    <>
      <Card className="mt-4 z-10 w-full flex flex-col-reverse md:flex-row">
        <div className="mt-4 md:mt-0 flex md:flex-none justify-between">
          {/* Votes */}
          <div className="h-auto md:h-fit bg-gray-100 px-2 p-1 md:p-2 rounded-md text-center font-semibold text-violet-800 flex flex-row md:flex-col items-center">
            <div
              className={`${voted === 1 ? '' : 'cursor-pointer'} mb-0 md:mb-2`}
              onClick={() => onVote(voteTypes.upvote)}
            >
              <PlusIcon isActive={voted === 1} />
            </div>
            <div className="mb-0 md:mb-1 ml-2 md:ml-0 text-blue font-medium">{score}</div>
            <div
              className={`${voted === -1 ? '' : 'cursor-pointer'} ml-2 md:ml-0 mt-1 md:mt-1`}
              onClick={() => onVote(voteTypes.downvote)}
            >
              <MinusIcon className="ml-1" isActive={voted === -1} />
            </div>
          </div>

          {/* Actions */}
          {isCurrentUser && (
            <div className="flex md:hidden">
              <button className="text-softRed hover:opacity-50 cursor-pointer flex items-center" onClick={onDelete}>
                <DeleteIcon />
                <span className="ml-2 font-medium">Delete</span>
              </button>
              <button className="text-darkBlue hover:opacity-50 cursor-pointer ml-4 flex items-center" onClick={onEdit}>
                <EditIcon />
                <span className="ml-2 font-medium">Edit</span>
              </button>
            </div>
          )}
          {!isCurrentUser && (
            <div className="block md:hidden">
              <button className="text-darkBlue hover:opacity-50 cursor-pointer flex items-center" onClick={onReply}>
                <ReplyIcon />
                <span className="ml-2 font-medium">Reply</span>
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 ml-0 md:ml-6 w-full">
          {/* Title */}
          <div className="flex mb-3 items-center">
            <ProfilePicture userImg={userImg} username={username} />
            <span className="ml-4 font-medium">{username}</span>
            {isCurrentUser && <div className="bg-blue px-2 ml-2 text-white rounded-md text-sm">you</div>}
            <span className="ml-4 font-light text-grayBlue flex-1">{createdAt}</span>
            {/* Actions */}
            {isCurrentUser && (
              <div className="hidden md:flex flex-row">
                <button className="text-softRed hover:opacity-50 cursor-pointer flex items-center" onClick={onDelete}>
                  <DeleteIcon />
                  <span className="ml-2 font-medium">Delete</span>
                </button>
                <button
                  className="text-darkBlue hover:opacity-50 cursor-pointer ml-4 flex items-center"
                  onClick={onEdit}
                >
                  <EditIcon />
                  <span className="ml-2 font-medium">Edit</span>
                </button>
              </div>
            )}
            {!isCurrentUser && (
              <button
                className="hidden md:flex text-darkBlue hover:opacity-50 cursor-pointer items-center"
                onClick={onReply}
              >
                <ReplyIcon />
                <span className="ml-2 font-medium">Reply</span>
              </button>
            )}
          </div>
          {/* Description */}
          <div className="text-grayBlue w-full">
            {replyingTo && !showEdit && <span className="text-darkBlue font-medium mr-1">@{replyingTo.username}</span>}
            {!showEdit && content}
            {showEdit && (
              <TextArea
                rows="4"
                className="flex-1"
                placeholder="Add a reply.."
                ref={editRef}
                value={editedMsg}
                onChange={(event) => setEditedMsg(event.target.value)}
              />
            )}
          </div>
          {showEdit && (
            <div className="flex justify-end mt-2">
              <Button
                isLoading={isReply ? updateReplyApi.isLoading : updateCommentApi.isLoading}
                onClick={onUpdateAsync}
              >
                Update
              </Button>
            </div>
          )}
        </div>
      </Card>

      <AddReply isLoading={addReplyApi.isLoading} onReply={onReplyAsync} willShow={showAddReply}></AddReply>

      {replies.map(({ id: replyId, createdAt, content, replyingTo, score, voted: replyVoted, user }) => (
        <div className="flex w-full" key={replyId}>
          {/* Vertical Line */}
          <div className="ml-0 md:ml-10">
            <div className="border-l-2 rounded-lg border-gray-200 h-full"></div>
          </div>
          <div className="ml-4 md:ml-8 flex-1">
            <Comment
              key={id}
              id={id}
              isReply={true}
              replyId={replyId}
              createdAt={createdAt}
              content={content}
              currentUser={currentUser}
              score={score}
              username={user.username}
              userImg={user.image.webp}
              userId={user.id}
              voted={replyVoted}
              replyingTo={replyingTo}
            />
          </div>
        </div>
      ))}

      <DeleteComment
        isLoading={isReply ? deleteReplyApi.isLoading : deleteCommentApi.isLoading}
        isOpen={showDelete}
        onYes={onDeleteAsync}
        onClose={() => setShowDelete(false)}
      />
    </>
  );
}
