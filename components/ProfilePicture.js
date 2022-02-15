import Image from 'next/image';

const Loader = () => {
  return (<div>...</div>)
}

const ProfilePicture = ({ children, userImg, username, ...otherProps }) => {
  return (
    userImg ? (
      <Image
        height={24}
        width={24}
        src={userImg || ''}
        alt={username}
        {...otherProps}
      />
    ) : <></>
  );
};

export default ProfilePicture;
