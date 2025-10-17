import express from 'express';
import * as authController from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', authController.postRegister);
router.get('/register', authController.getRegister);
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.post('/addProfile', authController.setProfile);
router.get('/logout', authController.logout);
router.get('/addProfile', authController.getSetProfile);
export default router;