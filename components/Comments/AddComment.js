import React, { useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import Button from '../Button';
import Card from '../Card';
import ProfilePicture from '../ProfilePicture';

function AddComment({ sendText = 'send', ...props }, ref) {
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const userContext = useUserContext();

  const onSubmit = async () => {
    const data = { comment };
    setIsLoading(true);
    const fetchResponse = await fetch('/api/comments/add', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    });

    const response = await fetchResponse.json();
    setIsLoading(false);
  };

  return (
    <Card className='w-full flex' ref={ref} {...props}>
      <div>
        <ProfilePicture
          userImg={userContext.user.image.webp}
          username={userContext.user.username}
        />
      </div>
      <div className='flex-1 mx-4 h-24'>
        <textarea
          className='py-3 px-4 resize-none border border-gray-200 focus:outline-none focus:border-blue rounded-md w-full h-full flex-1'
          placeholder='Add a comment..'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      <div>
        <Button onClick={onSubmit} isLoading={isLoading}>{sendText}</Button>
      </div>
    </Card>
  );
}

const forwardedAddComment = React.forwardRef(AddComment);

export default forwardedAddComment;
