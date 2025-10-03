import express from 'express';
import { 
    analyzeMealImageUpload, 
    getUploadPage, 
    uploadMiddleware 
} from '../controllers/mealAnalysis.controller.js';

const router = express.Router();

router.get('/upload', getUploadPage);

router.post('/analyze', uploadMiddleware, analyzeMealImageUpload);

export default router;