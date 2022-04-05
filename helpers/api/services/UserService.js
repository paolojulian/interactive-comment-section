import User from '../models/User';

const UserService = (() => {
  const getCurrentUser = async () => {
    try {
      const currentUser = await User.findCurrentUser();
      return { ok: true, data: currentUser };
    } catch (error) {
      return { ok: false, error };
    }
  };

  return {
    getCurrentUser,
  };
})();

export default UserService;
