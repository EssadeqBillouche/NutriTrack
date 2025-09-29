const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');
const profileController = require('../controllers/profile.controller');
