const db = require('/data/db.json');

const handler = (req, res) => {
  const data = db.users.find(user => user.id === db.currentUser);
  res.status(200).json(data);
};

export default handler;