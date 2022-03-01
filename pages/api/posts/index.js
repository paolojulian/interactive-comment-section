const db = require('../db.json');

const handler = (req, res) => {
  res.status(200).json(db);
};

export default handler;
