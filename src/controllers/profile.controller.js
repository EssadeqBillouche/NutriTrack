const profileService = require('../services/profile.service');

module.exports = {
  getProfile: async (req, res, next) => {
    try {
      const userId = req.user.id; 
      const profileData = await profileService.fetchUserProfile(userId);      
      res.json(profileData);
    } catch (error) {
      next(error);
    }
  }
};
