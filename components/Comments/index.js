import React from 'react';

import AddComment from './AddComment';
import Comment from './Comment';
import { useUserContext } from '../../context/UserContext';

export default function Comments() {
  const userContext = useUserContext();

  const [list, setList] = React.useState([]);

  const fetchListAsync = async () => {
    try {
      const response = await fetch('/data.json');
      const { comments, currentUser } = await response.json();
      console.log(comments);
      setList([...comments]);
      userContext.login(currentUser);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    fetchListAsync();
    console.log('test');
  }, []);

  return (
    <div className='flex flex-col items-center justify-center max-w-2xl mx-auto'>
      {list && list.map(({ id, createdAt, content, replies, score, user }) => (
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

      <AddComment className='mt-4 w-full'/>
    </div>
  );
}
