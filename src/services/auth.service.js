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
  try{
  const user = await authRepository.findUserByEmail(email);
  if (!user) {
    throw new Error('Invalid email or password');
  }
  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }
  return user;
}catch(err){
  console.error("Error in login service:", err);
  throw err;
  }
};
export const checkifHeHasProfile = async (id)=> {
  const userProfile = await authRepository.checkifHeHasProfile(id)
  return userProfile;
}

export const setProfile = async (profileData) => {
  return await authRepository.setProfile(profileData);
};