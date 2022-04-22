import ResponseHandler from '../../response-handler';
import User from '../models/User';

const UserService = (() => {
  const getCurrentUser = async () => {
    try {
      const currentUser = await User.findCurrentUser();
      if (!currentUser) {
        return new ResponseHandler(false);
      }
      return new ResponseHandler(true, currentUser);
    } catch (error) {
      return new ResponseHandler(false, error);
    }
  };

  return {
    getCurrentUser,
  };
})();

export default UserService;
