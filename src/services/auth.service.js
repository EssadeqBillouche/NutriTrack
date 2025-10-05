import * as authRepository from '../persistence/auth.repository.js';
import bcrypt from 'bcryptjs';

export const register = async ({ first_name, last_name, email, password }) => {
  const existingUser = await authRepository.findUserByEmail(email);
  if (existingUser) {
    throw new Error('Email alreaddddy in use before');
  }
  return await authRepository.createUser({ first_name, last_name, email, password });
};

export const login = async ({ email, password }) => {
  const user = await authRepository.findUserByEmail(email);
  if (!user) {
    throw new Error('Invalid email or password');
  }
  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }
  return user;
};
//
// export const setProfile = async ({userId, profileType, height, currentWeight, targetWeight, activity_level, hasDiabetes, hasHypertension, hasObesity, disipline, trainingFrequency}){
//
// }