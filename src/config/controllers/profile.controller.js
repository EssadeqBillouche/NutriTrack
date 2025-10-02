import * as profileService from '../../services/profile.service.js';

export const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id; 
    const profileData = await profileService.fetchUserProfile(userId);
    res.json(profileData);
  } catch (error) {
    next(error);
  }
};

export const getProfileStatic = async (req, res) => {
  try {
    const userId = 1; // *temporary*,should be replqced with an acutal id from session
    
    const userData = await profileService.fetchUserWithProfile(userId);
    
    if (!userData) {
      // if no user data found
      return res.status(404).render('dashboard/profile', { 
        title: 'Profil Utilisateur',
        error: 'Aucune donnée de profil trouvée. Veuillez configurer la base de données et exécuter: npm run seed-profile',
        scripts: [],
        user: null 
      });
    }

    const bmi = profileService.calculateBMI(userData.current_weight_kg, userData.height_cm);
    const bmiCategory = profileService.getBMICategory(bmi);
    const profileTypeDisplay = profileService.getProfileTypeDisplay(userData.profile_type);

    res.render('dashboard/profile', { 
      title: 'Profil Utilisateur',
      user: userData,
      bmi: bmi,
      bmiCategory: bmiCategory,
      profileTypeDisplay: profileTypeDisplay,
      scripts: [],
      error: null
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).render('dashboard/profile', { 
      title: 'Profil Utilisateur',
      error: 'Erreur de connexion à la base de données. Veuillez vérifier votre configuration PostgreSQL.',
      scripts: [],
      user: null 
    });
  }
};

