import React from 'react';

import AddComment from './AddComment';
import Comment from './Comment';
import { useUserContext } from '../../context/UserContext';

export default function Comments() {
  const userContext = useUserContext();

  const [list, setList] = React.useState([]);

  const fetchListAsync = React.useCallback(async () => {
    try {
      const response = await fetch('/data.json');
      const { comments, currentUser } = await response.json();
      setList([...comments]);
      userContext.login(currentUser);
    } catch (e) {
      console.log(e);
    }
  }, [list]);

  React.useEffect(() => {
    fetchListAsync();
  }, []);

  return (
    <div className='flex flex-col items-center justify-center max-w-2xl mx-auto'>
      {list.map(({ id, createdAt, content, replies, score, user }) => (
        <Comment
          key={id}
          createdAt={createdAt}
          content={content}
          currentUser={userContext.user}
          replies={replies}
          score={score}
          username={user.username}
          userImg={user.image.webp}
        />
      ))}

      <AddComment />
    </div>
  );
}
