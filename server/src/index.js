import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './db/index.js';
import { logger } from './utils/logger.js';

// Load environment variables
dotenv.config();

const startServer = async () => {
    try {
        // Connect to database
        const dbConnected = await connectDB();

        if (!dbConnected) {
            logger.error('Database connection failed - server may not function properly');
        }

        // Start server
        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        logger.error('Failed to start server:', error.message);
        console.error('❌ Failed to start server:', error.message);
        process.exit(1);
    }
};

// Start the application
startServer();
