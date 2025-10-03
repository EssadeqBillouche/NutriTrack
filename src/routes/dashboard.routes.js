import * as dashboardControllers from '../controllers/dashboard.controller.js';
import * as profileControllers from '../config/controllers/profile.controller.js';
import { Router } from 'express';

const router = Router();

router.get('/', dashboardControllers.showDashboard);
router.get('/profile', profileControllers.getProfileStatic);

export default router;