import { saveJsonFile } from '../../../helpers/api/saveJsonFile';

let db = require('/data/db.json');

/**
 * Handler
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
const handler = async (req, res) => {
  const { id } = req.query;
  if (req.method === 'DELETE') {
    db.comments = db.comments.filter((comment) => Number(comment.id) !== Number(id));
    saveJsonFile(db);
    return res.status(200).json(db);
  }

  return res.status(200).send();
};

export default handler;
