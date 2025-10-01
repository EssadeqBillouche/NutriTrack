import * as dashboardControllers from '../controllers/dashboard.controller.js';
import { Router } from 'express';

const router = Router();

router.get('/', dashboardControllers.showDashboard);

export default router;