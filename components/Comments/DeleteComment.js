import Modal from '../Modal';

const DeleteComment = ({ ...props }) => {
  return (
    <Modal
      title='Delete comment'
      description="Are you sure you want to delete this comment? This will remove the comment and can't be undone"
      yes='Yes, delete'
      no='no, cancel'
      {...props}
    />
  );
};

export default DeleteComment;
