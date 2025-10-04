import * as authService from '../services/auth.service.js';

export const postRegister = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const user = await authService.register({ first_name, last_name, email, password });
    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user.id, first_name: user.first_name, last_name: user.last_name, email: user.email },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.login({ email, password });
    req.session.user = { id: user.id, first_name: user.first_name, last_name: user.last_name, email: user.email };
    res.status(200).json({ message: 'Login successful', user: req.session.user });
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