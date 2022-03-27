import { NextApiRequest } from 'next';
import { saveJsonFile } from '../../../../../helpers/api/saveJsonFile';

let db = require('/data/db.json');

/**
 * Handler
 *
 * @param {NextApiRequest} req
 * @param {*} res
 */
const handler = async (req, res) => {
  console.log(req.query);
  // const comment = {
  //   id: null,
  //   content: req.body.comment.content,
  //   createdAt: 'now',
  //   score: 0,
  //   user: db.currentUser,
  //   replies: [],
  // };
  // comment.id = db.comments.length
  //   ? Math.max(...db.comments.map((x) => x.id)) + 1
  //   : 1;
  // db.comments.push(comment);

  // saveJsonFile(db);
  // comment.user = db.users.find(user => Number(user.id) === Number(db.currentUser));
  res.status(201).send();
};

export default handler;
