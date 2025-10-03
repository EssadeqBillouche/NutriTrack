import express from 'express';
import { 
    analyzeMealImageUpload, 
    renderUploadPage, 
    uploadMiddleware 
} from '../controllers/mealAnalysis.controller.js';

const router = express.Router();

router.get('/upload', renderUploadPage);

router.post('/analyze', uploadMiddleware, analyzeMealImageUpload);

export default router;