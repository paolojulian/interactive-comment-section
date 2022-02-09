import Image from 'next/image';

const ProfilePicture = ({ children, userImg, username, ...otherProps }) => {
  return (
    <Image
      height={24}
      width={24}
      src={userImg || ''}
      alt={username}
      {...otherProps}
    />
  );
};

export default ProfilePicture;
