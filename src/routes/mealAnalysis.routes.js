import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import * as mealRoutes from "../controllers/mealAnalysis.controller.js"


const router = Router();

router.get('/meal-analysis', authMiddleware);
router.post('/meal-analysis', authMiddleware);
router.get('/meal-history', authMiddleware);
router.get('/meal-detail/:mealId', authMiddleware);

export default router;