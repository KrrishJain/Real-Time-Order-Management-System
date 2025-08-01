/**
 * Order Model Schema
 * Simple schema for CRUD operations
 */

import { z } from 'zod';

// Simple Order schema
export const OrderSchema = z.object({
    orderId: z.string().uuid('Order ID must be a valid UUID'),
    customerName: z.string().min(1, 'Customer name is required'),
    orderAmount: z.number().positive('Order amount must be positive'),
    orderDate: z.string().datetime('Order date must be a valid ISO timestamp'),
    invoiceFileUrl: z.string().url('Invoice file URL must be a valid S3 URL').optional()
});

// DynamoDB Table Schema
export const OrderTableSchema = {
    tableName: process.env.DYNAMODB_TABLE_NAME || 'orders-table',
    keySchema: [
        {
            AttributeName: 'orderId',
            KeyType: 'HASH'
        }
    ],
    attributeDefinitions: [
        {
            AttributeName: 'orderId',
            AttributeType: 'S'
        }
    ],
    provisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
};

// Validation function
export const validateOrder = (data) => {
    try {
        return {
            success: true,
            data: OrderSchema.parse(data),
            error: null
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            error: error.errors
        };
    }
};

export default {
    OrderSchema,
    OrderTableSchema,
    validateOrder
};