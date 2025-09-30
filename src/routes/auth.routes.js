import express from 'express';
import * as authController from '../controllers/auth.controller.js';
import * as authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', authMiddleware.validateRegister, authController.postRegister);
router.post('/login', authMiddleware.validateLogin, authController.postLogin);
router.post('/logout', authController.logout);

export default router;