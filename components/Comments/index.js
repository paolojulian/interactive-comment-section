import React from 'react';

import AddComment from './AddComment';
import Comment from './Comment';
import { useUserContext } from '../../context/UserContext';
import CommentLoader from './CommentLoader';

export default function Comments({ list, isLoading }) {
  const userContext = useUserContext();

  return (
    <div className='flex flex-col items-center justify-center max-w-2xl mx-auto w-full'>
      <CommentLoader isVisible={isLoading} />
      {!isLoading &&
        list &&
        list.map(({ id, createdAt, content, replies, score, user }) => (
          <Comment
            key={id}
            createdAt={createdAt}
            content={content}
            currentUser={userContext.user}
            replies={replies}
            score={score}
            username={user.username}
            userImg={user.image.png}
          />
        ))}

      {!isLoading && <AddComment className='mt-4 w-full' />}
    </div>
  );
}
