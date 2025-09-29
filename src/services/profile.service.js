const profileRepository = require('../persistence/profile.repository');

module.exports = {
  fetchUserProfile: async (userId) => {
    const profile = await profileRepository.getProfileByUserId(userId);
    return profile;
  }
};
