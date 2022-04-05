import UserService from '../../../helpers/api/services/UserService';

const handler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      const response = await UserService.getCurrentUser();
      if (!response.ok) return res.status(500).send(response.error);
      return res.status(200).json(response.data);

    default:
      return res.status(404).send();
  }
};

export default handler;
