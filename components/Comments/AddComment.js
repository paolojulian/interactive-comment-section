import React, { useState } from 'react';
import { useCommentsContext } from '../../context/CommentsContext';
import { useUserContext } from '../../context/UserContext';
import Button from '../Button';
import Card from '../Card';
import ProfilePicture from '../ProfilePicture';

function AddComment({ sendText = 'send', onAddComment, isLoading, className, ...props }, ref) {
  const [comment, setComment] = useState('');
  const userContext = useUserContext();
  const { addCommentApi } = useCommentsContext();

  const onSubmit = async () => {
    if (onAddComment) {
      return onAddComment(comment);
    }

    const response = await addCommentApi.request(comment);
    if (response.ok) {
      setComment('');
    }
  };

  return (
    <Card className={"w-full flex flex-col md:flex-row " + className} ref={ref} {...props}>
      <div className="hidden md:block">
        <ProfilePicture userImg={userContext.user.image.png} username={userContext.user.username} />
      </div>
      <div className="flex-1 mx-0 md:mx-4 h-24">
        <textarea
          className="py-3 px-4 resize-none border border-gray-200 focus:outline-none focus:border-blue rounded-md w-full h-full flex-1"
          placeholder="Add a comment.."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      <div className="hidden md:block">
        <Button onClick={onSubmit} isLoading={addCommentApi.isLoading || isLoading === true}>
          {sendText}
        </Button>
      </div>

      {/* Mobile view */}
      <div className="flex md:hidden justify-between items-center mt-4 md:mt-0">
        <div>
          <ProfilePicture userImg={userContext.user.image.png} username={userContext.user.username} />
        </div>
        <Button onClick={onSubmit} isLoading={addCommentApi.isLoading || isLoading === true}>
          {sendText}
        </Button>
      </div>
    </Card>
  );
}

const forwardedAddComment = React.forwardRef(AddComment);

export default forwardedAddComment;
