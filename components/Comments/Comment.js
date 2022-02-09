import Image from 'next/image';
import Card from '../Card';

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
  const isCurrentUser = currentUser && currentUser.username === username;

  return (
    <>
      <Card className='mt-4'>
        {/* Votes */}
        <div>
          <div className='bg-gray-100 p-3 rounded-md text-center font-semibold text-violet-800'>
            <div className='cursor-pointer mb-5'>
              <Image
                className='mx-auto text-blue'
                src='/images/icon-plus.svg'
                alt='upvote'
              />
            </div>
            <div className='mb-5 text-blue font-medium text-sm'>{score}</div>
            <div className='cursor-pointer'>
              <Image
                className='mx-auto'
                src='/images/icon-minus.svg'
                alt='downvote'
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className='flex-1 ml-6'>
          {/* Title */}
          <div className='flex mb-3 items-center'>
            <Image className='h-7 w-7' src={userImg} alt='profile-picture' />
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
                <span className='text-softRed hover:opacity-50 cursor-pointer'>
                  <Image
                    src='/images/icon-delete.svg'
                    className='inline-block'
                    alt='delete-icon'
                  />
                  <span className='ml-1 font-medium'>Delete</span>
                </span>
                <span className='text-darkBlue hover:opacity-50 cursor-pointer ml-4'>
                  <Image
                    src='/images/icon-edit.svg'
                    className='inline-block'
                    alt='edit-icon'
                  />
                  <span className='ml-1 font-medium'>Edit</span>
                </span>
              </>
            )}
            {!isCurrentUser && (
              <span className='text-darkBlue hover:opacity-50 cursor-pointer'>
                <Image
                  src='/images/icon-reply.svg'
                  className='inline-block'
                  alt='reply-icon'
                />
                <span className='ml-1 font-medium'>Reply</span>
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
    </>
  );
}
