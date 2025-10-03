import * as profileRepository from '../persistence/profile.repository.js';

export const fetchUserProfile = async (userId) => {
  return await profileRepository.getProfileByUserId(userId);
};

export const fetchUserWithProfile = async (userId) => {
  return await profileRepository.getUserWithProfile(userId);
};

export const calculateBMI = (weight, height) => {
  if (!weight || !height) return null;
  const heightInMeters = height / 100;
  return (weight / (heightInMeters * heightInMeters)).toFixed(1);
};

export const getBMICategory = (bmi) => {
  if (!bmi) return 'Non défini';
  if (bmi < 18.5) return 'Insuffisance pondérale';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Surpoids';
  return 'Obésité';
};

export const getProfileTypeDisplay = (profileType) => {
  const types = {
    'weight_loss': 'Perte de poids',
    'weight_gain': 'Prise de masse',
    'maintenance': 'Maintien',
    'athlete': 'Sportif',
    'diabetic': 'Diabétique',
    'hypertensive': 'Hypertendu',
    'obese': 'Obésité'
  };
  return types[profileType] || profileType;
};

