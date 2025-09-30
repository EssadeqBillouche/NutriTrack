import express from 'express';
// import authMiddleware from '../middlewares/auth.middleware.js';
import * as profileController from '../controllers/profile.controller.js'
const router = express.Router()

// Get
// router.get(
//   '/',
//   authMiddleware,
//   profileController.getProfile
// );

router.get('/', profileController.getProfileStatic);

export default router;