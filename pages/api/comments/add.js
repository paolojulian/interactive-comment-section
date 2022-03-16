import { NextApiRequest } from 'next';

const fs = require('fs');

let db = require('/data/db.json');

/**
 * Handler
 *
 * @param {NextApiRequest} req
 * @param {*} res
 */
const handler = async (req, res) => {
  const comment = {
    id: null,
    content: req.body.comment,
    createdAt: 'now',
    score: 0,
    user: db.currentUser,
    replies: [],
  };
  comment.id = db.comments.length
    ? Math.max(...db.comments.map((x) => x.id)) + 1
    : 1;
  db.comments.push(comment);

  await saveData();
  res.status(201).json(db.comments);
};

async function saveData() {
  fs.writeFileSync('data/db.json', JSON.stringify(db, null));
}

export default handler;
