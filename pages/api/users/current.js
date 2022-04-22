import UserService from '../../../helpers/api/services/UserService';

const handler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      const response = await UserService.getCurrentUser();

      return res.status(response.ok ? 200 : 500).json(response.data);

    default:
      return res.status(404).send();
  }
};

export default handler;
