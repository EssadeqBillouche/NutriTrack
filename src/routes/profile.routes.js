const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const profileController = require('../controllers/profile.controller');

// Get
router.get(
  '/',
  authMiddleware,
  profileController.getProfile
);

module.exports = router;