import * as profileRepository from '../persistence/profile.repository.js';

export async function fetchUserProfile(userId) {
  return await profileRepository.getProfileByUserId(userId);
}
