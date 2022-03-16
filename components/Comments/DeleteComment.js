import Modal from '../Modal';

const DeleteComment = ({ ...props }) => {
  const onDelete = async () => {
    const fetchResponse = await fetch('/api/comments/4', { method: 'DELETE' });
    props.onClose();
  }

  return (
    <Modal
      title='Delete comment'
      description="Are you sure you want to delete this comment? This will remove the comment and can't be undone"
      yes='Yes, delete'
      no='no, cancel'
      width='xs'
      onYes={onDelete}
      {...props}
    />
  );
};

export default DeleteComment;
