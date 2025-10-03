import multer from 'multer';

// Memory storage
const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
});

export const analyzeMealImageUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No image file uploaded'
            });
        }

        const fileInfo = {
            filename: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
            uploadedAt: new Date().toISOString()
        };

        res.json({
            success: true,
            message: 'Image uploaded successfully',
            file: fileInfo,
            analysis: { message: 'AI analysis would go here' }
        });

    } catch (error) {
        console.error('Upload analysis error:', error);
        res.status(500).json({
            success: false,
            message: 'Upload failed: ' + error.message
        });
    }
};

export const renderUploadPage = (req, res) => {
    res.status(200).json({ message: 'Upload page' });
    res.render('meals/upload');
};

export const uploadMiddleware = upload.single('mealImage');