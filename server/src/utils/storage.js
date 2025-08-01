/**
 * Storage Utilities
 * Handles S3 storage operations and connection testing
 */

import { s3 } from '../config/aws.js';
import { logger } from './logger.js';

/**
 * Test S3 storage connection
 * @returns {Promise<boolean>} - Returns true if S3 is accessible
 */
export const testStorageConnection = async () => {
    try {
        const bucketName = process.env.S3_BUCKET_NAME;
        
        if (!bucketName) {
            logger.warn('S3_BUCKET_NAME not configured');
            return false;
        }

        await s3.headBucket({ Bucket: bucketName }).promise();
        logger.info('AWS S3 storage connected successfully');
        return true;
    } catch (error) {
        logger.error('S3 storage connection error:', error.message);
        console.error('S3 storage connection error:', error.message);
        return false;
    }
};

/**
 * Upload file to S3
 * @param {string} key - S3 object key
 * @param {Buffer|string} body - File content
 * @param {string} contentType - MIME type
 * @returns {Promise<Object>} - S3 upload result
 */
export const uploadFile = async (key, body, contentType = 'application/octet-stream') => {
    try {
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
            Body: body,
            ContentType: contentType,
        };

        const result = await s3.upload(params).promise();
        logger.info(`File uploaded successfully: ${key}`);
        return result;
    } catch (error) {
        logger.error(`File upload error for ${key}:`, error.message);
        throw error;
    }
};

/**
 * Delete file from S3
 * @param {string} key - S3 object key
 * @returns {Promise<Object>} - S3 delete result
 */
export const deleteFile = async (key) => {
    try {
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
        };

        const result = await s3.deleteObject(params).promise();
        logger.info(`File deleted successfully: ${key}`);
        return result;
    } catch (error) {
        logger.error(`File deletion error for ${key}:`, error.message);
        throw error;
    }
};

/**
 * Get signed URL for file access
 * @param {string} key - S3 object key
 * @param {number} expires - URL expiration in seconds (default: 1 hour)
 * @returns {string} - Signed URL
 */
export const getSignedUrl = (key, expires = 3600) => {
    try {
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
            Expires: expires,
        };

        const url = s3.getSignedUrl('getObject', params);
        logger.info(`Signed URL generated for: ${key}`);
        return url;
    } catch (error) {
        logger.error(`Signed URL generation error for ${key}:`, error.message);
        throw error;
    }
};
