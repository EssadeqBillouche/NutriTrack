import profileService from '../services/profile.service.js';

const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id; // Auth middleware supposes user info on req
    const profileData = await profileService.fetchUserProfile(userId);
    res.json(profileData);
  } catch (error) {
    next(error);
  }
};

export const getProfileStatic = (req, res) =>{
  res.render('dashboard/profile')
}

export default {
  getProfileStatic,
};
