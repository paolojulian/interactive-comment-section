import React from 'react';

import AddComment from './AddComment';
import Comment from './Comment';
import { useUserContext } from '../../context/UserContext';
import { useCommentsContext } from '../../context/CommentsContext';

export default function Comments() {
  const userContext = useUserContext();
  const { comments } = useCommentsContext();

  return (
    <div className="flex flex-col items-center justify-center max-w-2xl mx-auto w-full mb-0 md:mb-20 p-4 md:p-0">
      {comments &&
        comments.map(({ id, createdAt, content, replies, score, user }) => (
          <Comment
            key={id}
            id={id}
            createdAt={createdAt}
            content={content}
            currentUser={userContext.user}
            replies={replies}
            score={score}
            userId={user.id}
            username={user.username}
            userImg={user.image.png}
          />
        ))}

      <AddComment className="mt-4 w-full" />
    </div>
  );
}
