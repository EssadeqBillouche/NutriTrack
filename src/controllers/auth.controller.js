import * as authService from '../services/auth.service.js';
import sessionConfig from '../config/session.js';



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
    
    req.session.user = {id: user.id, first_name : user.first_name, last_name : user.last_name }
    res.status(200).json({ message: 'Login successful'}); 
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to log out' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
};

export const setProfile = {req, res}{
  
}