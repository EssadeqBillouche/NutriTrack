import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Script } from 'vm';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
        fileSize: 5 * 1024 * 1024
    }
});

const saveImageToDisk = (buffer, originalName) => {
    try {
        // Create uploads directory if it doesn't exist
        const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');

        // Generate unique filename to avoid conflicts
        const timestamp = Date.now();
        const fileExtension = path.extname(originalName);
        const baseName = path.basename(originalName, fileExtension);
        const uniqueFileName = `${baseName}_${timestamp}${fileExtension}`;
        
        const filePath = path.join(uploadsDir, uniqueFileName);

        // Write buffer to file
        fs.writeFileSync(filePath, buffer);

        return {
            success: true,
            filePath: path.join('uploads', uniqueFileName),
            fileName: uniqueFileName,
            fullPath: filePath
        };
    } catch (error) {
        console.error('Error saving image to disk:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

export const analyzeMealImageUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No image file uploaded'
            });
        }

        const buffer = req.file.buffer;
        console.log(buffer.length);

        const saveResult = saveImageToDisk(buffer, req.file.originalname);
        
        if (!saveResult.success) {
            return res.status(500).json({
                success: false,
                message: 'Failed to save image: ' + saveResult.error
            });
        }

        const fileInfo = {
            filename: req.file.originalname,
            savedFilename: saveResult.fileName,
            filePath: saveResult.filePath,
            mimetype: req.file.mimetype,
            size: req.file.size,
            uploadedAt: new Date().toISOString()
        };

        res.json({
            success: true,
            message: 'Image uploaded and saved successfully',
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

export const getUploadPage = (req, res) => {
    res.render('meals/upload' ,{layout : false, scripts : false});
};

export const getImageFromMemory = (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: 'No file found in memory'
        });
    }
    
    res.json({
        success: true,
        buffer: req.file.buffer.toString('base64'),
        filename: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        uploadedAt: new Date().toISOString()
    });
};

export const saveImageToPublicUploads = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No image file in memory to save'
            });
        }

        const saveResult = saveImageToDisk(req.file.buffer, req.file.originalname);
        
        if (!saveResult.success) {
            return res.status(500).json({
                success: false,
                message: 'Failed to save image: ' + saveResult.error
            });
        }

        res.json({
            success: true,
            message: 'Image saved to public/uploads successfully',
            fileInfo: {
                originalName: req.file.originalname,
                savedName: saveResult.fileName,
                filePath: saveResult.filePath,
                fullPath: saveResult.fullPath,
                size: req.file.size,
                mimetype: req.file.mimetype,
                savedAt: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('Save image error:', error);
        res.status(500).json({
            success: false,
            message: 'Save image failed: ' + error.message
        });
    }
};

export const uploadMiddleware = upload.single('mealImage');