
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { logger } from '../utils/logger.js';

// Configure AWS DynamoDB client
const dynamoDBClient = new DynamoDBClient({
    region: process.env.AWS_REGION || 'us-east-1'
    // credentials will be auto-detected from AWS CLI, IAM roles, or environment
});

export const dynamodb = DynamoDBDocumentClient.from(dynamoDBClient);

export { dynamoDBClient };

export const config = {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
    allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    aws: {
        region: process.env.AWS_REGION || 'us-east-1',
        dynamoTableName: process.env.DYNAMODB_TABLE_NAME || 'orders-table'
    }
};

// Log AWS configuration
logger.info('AWS DynamoDB configured with SDK v3', {
    region: config.aws.region,
    dynamoTableName: config.aws.dynamoTableName,
    nodeEnv: config.nodeEnv
});
