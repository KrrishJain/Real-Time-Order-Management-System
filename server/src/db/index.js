import { 
    DescribeTableCommand, 
    CreateTableCommand
} from '@aws-sdk/client-dynamodb';
import { dynamoDBClient } from '../config/aws.js';
import { logger } from '../utils/logger.js';
import { OrderTableSchema } from '../models/order.model.js';

export const connectDB = async () => {
    try {
        logger.info('Connecting to DynamoDB...');
        
        // Check if table exists
        try {
            await dynamoDBClient.send(new DescribeTableCommand({
                TableName: OrderTableSchema.tableName
            }));
            logger.info(`Table '${OrderTableSchema.tableName}' exists and ready`);
            return true;
        } catch (error) {
            if (error.name === 'ResourceNotFoundException') {
                // Table doesn't exist, create it
                logger.info(`Creating table '${OrderTableSchema.tableName}'...`);
                
                await dynamoDBClient.send(new CreateTableCommand({
                    TableName: OrderTableSchema.tableName,
                    KeySchema: OrderTableSchema.keySchema,
                    AttributeDefinitions: OrderTableSchema.attributeDefinitions,
                    ProvisionedThroughput: OrderTableSchema.provisionedThroughput
                }));
                
                logger.info(`Table '${OrderTableSchema.tableName}' created successfully`);
                return true;
            } else {
                throw error;
            }
        }
    } catch (error) {
        logger.error('Database connection failed:', error.message);
        console.error('❌ Database connection failed:', error.message);
        return false;
    }
};
