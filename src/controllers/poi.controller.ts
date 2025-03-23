import type { Request, Response } from 'express';
import multer from 'multer';
import sharp from 'sharp';
import exifr from 'exifr';
import { create } from 'ipfs-http-client';
import { db } from '../db';
import { poiSubmissions } from '../db/schema';

// Configure IPFS client
const ipfs = create({ url: process.env.IPFS_NODE_URL || 'http://localhost:5001' });

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
    },
    fileFilter: (_req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/heic'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file format. Only JPEG, JPG, and HEIC formats are allowed.'));
        }
    },
}).fields([
    { name: 'beforeImage', maxCount: 1 },
    { name: 'afterImage', maxCount: 1 },
]);

// Helper function to process and validate image
async function processImage(file: Express.Multer.File) {
    // Convert image to JPEG format and optimize
    const processedImage = await sharp(file.buffer)
        .jpeg({ quality: 80 })
        .toBuffer();

    // Extract metadata
    const metadata = await exifr.parse(file.buffer, {
        pick: ['GPSLatitude', 'GPSLongitude', 'DateTimeOriginal'],
    });

    return {
        buffer: processedImage,
        metadata,
    };
}

// Submit PoI
export const submitPoI = async (req: Request, res: Response): Promise<void> => {
    try {
        // Handle file upload using multer
        upload(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                res.status(400).json({
                    success: false,
                    message: 'File upload error',
                    error: err.message,
                });
                return;
            } else if (err) {
                res.status(400).json({
                    success: false,
                    message: err.message,
                });
                return;
            }

            const files = req.files as { [fieldname: string]: Express.Multer.File[] };
            const userId = req.user?.id;

            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: 'Authentication required',
                });
                return;
            }

            // Validate that both images are provided
            if (!files.beforeImage?.[0] || !files.afterImage?.[0]) {
                res.status(400).json({
                    success: false,
                    message: 'Both before and after images are required',
                });
                return;
            }

            try {
                // Process both images
                const beforeImageResult = await processImage(files.beforeImage[0]);
                const afterImageResult = await processImage(files.afterImage[0]);

                // Upload images to IPFS
                const beforeImageCid = (await ipfs.add(beforeImageResult.buffer)).cid.toString();
                const afterImageCid = (await ipfs.add(afterImageResult.buffer)).cid.toString();

                // Extract location from either image (prefer before image)
                const latitude = beforeImageResult.metadata?.GPSLatitude?.toString() ||
                    afterImageResult.metadata?.GPSLatitude?.toString();
                const longitude = beforeImageResult.metadata?.GPSLongitude?.toString() ||
                    afterImageResult.metadata?.GPSLongitude?.toString();

                // Get image timestamp (prefer before image)
                const imageTimestamp = beforeImageResult.metadata?.DateTimeOriginal ||
                    afterImageResult.metadata?.DateTimeOriginal;

                // Create submission record
                const [submission] = await db.insert(poiSubmissions)
                    .values({
                        userId,
                        beforeImageCid,
                        afterImageCid,
                        latitude: latitude || null,
                        longitude: longitude || null,
                        submissionTimestamp: new Date(),
                        imageTimestamp: imageTimestamp ? new Date(imageTimestamp) : null,
                    })
                    .returning();

                res.status(200).json({
                    success: true,
                    data: {
                        submissionId: submission.id,
                        status: submission.status,
                    },
                });
            } catch (error) {
                console.error('Error processing submission:', error);
                res.status(500).json({
                    success: false,
                    message: 'Error processing submission',
                });
            }
        });
    } catch (error) {
        console.error('Error in submitPoI:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
}; 