import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import profileController from '../controllers/profile.controller.js';

const router = express.Router()
// Get
router.get(
  '/',
  authMiddleware,
  profileController.getProfile
);

export default router;