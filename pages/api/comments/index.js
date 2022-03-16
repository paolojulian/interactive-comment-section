const db = require('/data/db.json');

const handler = (req, res) => {
  const { comments, users, currentUser } = db;
  const data = comments.map((comment) => {
    const replies = comment.replies;

    return {
      ...comment,
      replies: replies.map((reply) => {
        return {
          ...reply,
          replyingTo: users.find(user => user.id === reply.replyingTo),
          user: users.find(user => user.id === reply.user),
        }
      }),
      user: users.find(user => user.id === comment.user)
    }
  });

  res.status(200).json(data);
};

export default handler;
