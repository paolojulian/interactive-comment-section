import { saveJsonFile } from '../../../../helpers/api/saveJsonFile';

let db = require('/data/db.json');

/**
 * Handler
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
const handler = async (req, res) => {
  const id = Number(req.query.id);

  if (req.method === 'DELETE') {
    db.comments = db.comments.filter((comment) => comment.id !== id);
    saveJsonFile(db);

    return res.status(200).json(db);
  }

  if (req.method === 'PUT') {
    const commentToUpdate = db.comments.find((comment) => comment.id === id);
    commentToUpdate.content = req.body.content;

    saveJsonFile(db);

    return res.status(200).json(db);
  }

  return res.status(200).send();
};

export default handler;
