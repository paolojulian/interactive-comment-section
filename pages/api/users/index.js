const db = require('/data/db.json');

const handler = (req, res) => {
  res.status(200).json(db.users);
};

export default handler;