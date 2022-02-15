import Image from 'next/image';

import Card from '../Card';
import DeleteIcon from '../Icons/DeleteIcon';
import EditIcon from '../Icons/EditIcon';
import ProfilePicture from '../ProfilePicture';
import ReplyIcon from '../Icons/ReplyIcon';
import PlusIcon from '../Icons/PlusIcon';
import MinusIcon from '../Icons/MinusIcon';
import DeleteComment from './DeleteComment';
import { useState } from 'react';

export default function Comment({
  replies = [],
  replyingTo = null,
  content,
  createdAt,
  currentUser,
  score,
  username,
  userImg,
}) {
  const [showDelete, setShowDelete] = useState(false);
  const isCurrentUser = currentUser && currentUser.username === username;

  const onDelete = () => {
    setShowDelete(!showDelete);
  };

  return (
    <>
      <Card className='mt-4'>
        {/* Votes */}
        <div>
          <div className='bg-gray-100 py-2 px-3 rounded-md text-center font-semibold text-violet-800'>
            <div className='cursor-pointer mb-2'>
              <PlusIcon />
            </div>
            <div className='mb-1 text-blue font-medium'>{score}</div>
            <div className='cursor-pointer'>
              <MinusIcon />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className='flex-1 ml-6'>
          {/* Title */}
          <div className='flex mb-3 items-center'>
            <ProfilePicture userImg={userImg} username={username} />
            <span className='ml-4 font-medium'>{username}</span>
            {isCurrentUser && (
              <div className='bg-blue px-2 ml-2 text-white rounded-md text-sm'>
                you
              </div>
            )}
            <span className='ml-4 font-light text-grayBlue flex-1'>
              {createdAt}
            </span>
            {/* Actions */}
            {isCurrentUser && (
              <>
                <button
                  className='text-softRed hover:opacity-50 cursor-pointer flex items-center'
                  onClick={onDelete}
                >
                  <DeleteIcon />
                  <span className='ml-2 font-medium'>Delete</span>
                </button>
                <span className='text-darkBlue hover:opacity-50 cursor-pointer ml-4 flex items-center'>
                  <EditIcon />
                  <span className='ml-2 font-medium'>Edit</span>
                </span>
              </>
            )}
            {!isCurrentUser && (
              <span className='text-darkBlue hover:opacity-50 cursor-pointer flex items-center'>
                <ReplyIcon />
                <span className='ml-2 font-medium'>Reply</span>
              </span>
            )}
          </div>
          {/* Description */}
          <div className='text-grayBlue'>
            {replyingTo && (
              <span className='text-darkBlue font-medium mr-1'>
                @{replyingTo}
              </span>
            )}
            {content}
          </div>
        </div>
      </Card>

      {replies.map(({ id, createdAt, content, replyingTo, score, user }) => (
        <div className='flex' key={id}>
          {/* Vertical Line */}
          <div>
            <div className='border-l-2 rounded-lg border-gray-200 h-full ml-10'></div>
          </div>
          <div className='ml-8'>
            <Comment
              key={id}
              createdAt={createdAt}
              content={content}
              currentUser={currentUser}
              score={score}
              username={user.username}
              userImg={user.image.webp}
              replyingTo={replyingTo}
            />
          </div>
        </div>
      ))}

      <DeleteComment isOpen={showDelete} onClose={() => setShowDelete(false)} />
    </>
  );
}
