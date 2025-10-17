import * as authService from '../services/auth.service.js';
import sessionConfig from '../config/session.js';
import session from "express-session";



export const getRegister = (req, res) => {
  res.render('auth/register', { title: 'Register', error : null, scripts :["/js/register.js", "/js/axios.min.js"] });
}
export const postRegister = async (req, res) => {
  try {
    const { first_name, last_name, email, password, age, gender } = req.body;
    const user = await authService.register({ first_name, last_name, email, password, age, gender});
    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user.id, first_name: user.first_name, last_name: user.last_name, email: user.email },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getLogin = (req, res) =>{
  res.render('auth/login', {title : 'Login', error : null, scripts : ['/js/login.js']});
}

export const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.login({ email, password });
    const profile = await authService.checkifHeHasProfile(user.id);
    if(profile) {
        req.session.user = {
            id: user.id, 
            first_name: user.first_name, 
            last_name: user.last_name, 
            training_frequency: profile.training_frequency, 
            athlete_discipline: profile.athlete_discipline,
            profileCompleted: true
        };
        
        // Save session before redirecting
        req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
                return res.status(500).json({ error: 'Failed to save session' });
            }
            res.redirect('/dashboard');
        });
    } else {
        req.session.user = {
            id: user.id, 
            first_name: user.first_name, 
            last_name: user.last_name,
            profileCompleted: false
        };
        
        // Save session before redirecting
        req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
                return res.status(500).json({ error: 'Failed to save session' });
            }
            res.redirect('/auth/addProfile');
        });
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to log out' });
    }
    res.redirect('/Auth/login');
  });
};

export const setProfile = async (req, res) => {
    const {profileType, height, currentWeight, targetWeight, activity_level, hasDiabetes, hasHypertension, hasObesity, discipline, trainingFrequency} = req.body;
    const userId = req.session.user.id;

    try {
        await authService.setProfile({
            userId,
            profileType,
            height,
            currentWeight,
            targetWeight,
            activity_level,
            hasDiabetes: hasDiabetes === 'on',
            hasHypertension: hasHypertension === 'on',
            hasObesity: hasObesity === 'on',
            discipline,
            trainingFrequency
        });

        // Update session
        req.session.user.profileCompleted = true;

        // Save session before redirecting
        req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
                return res.status(500).json({ error: 'Failed to save session' });
            }
            res.redirect('/dashboard');
        });
    } catch (error) {
        console.error('Error setting profile:', error);
        res.status(500).render('auth/profileSetup', {
            layout: false,
            title: "Set Your Profile",
            error: "Failed to save profile. Please try again."
        });
    }
}

export const getSetProfile = (req,res) => {
  res.render('auth/profileSetup', {layout : false, title : "set Your profile"})
}