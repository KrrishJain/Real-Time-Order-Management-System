# Real-Time Order Management System

A full-stack Order Management System built with Node.js, React.js, and AWS services.

## 🚀 Features

- **Backend (Node.js)**
  - RESTful API with Express.js
  - AWS DynamoDB for data storage
  - AWS S3 for invoice file uploads
  - AWS SNS for notifications
  - Winston logging system
  - ESLint + Prettier for code quality


- **AWS Integration**
  - DynamoDB for order data
  - S3 for file storage
  - SNS for email/SMS notifications

## 📋 Prerequisites

- Node.js 16+ 
- npm or yarn
- AWS Account with configured credentials
- Git

## 🛠️ Installation & Setup

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure your AWS credentials and environment variables in `.env`

5. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm start
```

The client will start on `http://localhost:3000`

### API Endpoints

- `POST /orders` - Create a new order
- `GET /orders` - Get all orders
- `GET /orders/:id` - Get order by ID
- `GET /health` - Health check endpoint

## 🗄️ Database Schema

### Order Entity
```json
{
  "orderId": "UUID",
  "customerName": "String",
  "orderAmount": "Number",
  "orderDate": "ISO Date String",
  "invoiceFileUrl": "String (S3 URL)"
}
```

## 🚀 Deployment

### AWS Services Setup

1. **DynamoDB Table**
   - Table name: `orders-table`
   - Primary key: `orderId` (String)

2. **S3 Bucket**
   - Bucket name: `order-invoices-bucket`
   - Enable public read access for invoice files

3. **SNS Topic**
   - Topic name: `order-notifications`
   - Subscribe email/SMS endpoints

### Environment Variables

#### Backend (.env)
```env
NODE_ENV=production
PORT=5000
LOG_LEVEL=info
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
DYNAMODB_TABLE_NAME=orders-table
S3_BUCKET_NAME=order-invoices-bucket
SNS_TOPIC_ARN=arn:aws:sns:us-east-1:123456789012:order-notifications
JWT_SECRET=your-jwt-secret
ALLOWED_ORIGINS=https://your-frontend-domain.com
```

## 🛠️ Development Commands

### Backend Commands
```bash
cd server

# Start development server
npm run dev

# Start production server
npm start

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format

# Check code formatting
npm run format:check
```

### Frontend Commands
```bash
cd client

# Start development server
npm start

# Build for production
npm run build

# Run linter
npm run lint

# Format code
npm run format
```

## 📁 Project Structure

```
project-root/
├── server/                 # Node.js Backend
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Route controllers
│   │   │   └── healthcheck.controller.js
│   │   ├── db/             # Database connection (AWS services)
│   │   │   └── index.js
│   │   ├── middleware/     # Custom middleware
│   │   │   └── errorHandler.js
│   │   ├── models/         # Data models
│   │   ├── routes/         # API routes
│   │   │   └── healthcheck.routes.js
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Utility functions
│   │   │   ├── logger.js   # Winston logger
│   │   │   └── morganConfig.js
│   │   ├── app.js          # Express app setup
│   │   └── index.js        # Server entry point
│   ├── logs/               # Log files (gitignored)
│   ├── .env.example        # Environment variables template
│   ├── .eslintrc.json      # ESLint configuration
│   ├── .prettierrc         # Prettier configuration
│   ├── .editorconfig       # Editor configuration
│   └── package.json
├── client/                 # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── utils/          # Utility functions
│   │   ├── App.js          # Main App component
│   │   ├── index.js        # React entry point
│   │   └── index.css       # Tailwind CSS imports
│   ├── .env.example        # Environment variables template
│   ├── tailwind.config.js  # Tailwind configuration
│   ├── postcss.config.js   # PostCSS configuration
│   └── package.json
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## 🔧 Key Technologies

### Backend Dependencies
- **Express.js** - Web framework
- **AWS SDK** - AWS services integration
- **Winston** - Logging system
- **Morgan** - HTTP request logger
- **Multer** - File upload handling
- **Helmet** - Security middleware
- **CORS** - Cross-origin requests
- **JWT** - Authentication tokens
- **Zustand** - Data validation
- **Swagger** - API documentation


### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Nodemon** - Development server auto-restart

## 📝 Logging

The application uses a robust logging system:

### Winston Logger
- Multiple transports (console, file)
- Log rotation for production logs
- Custom log formatting with timestamps
- Different log levels for development/production
- Structured JSON logging in production

### Morgan HTTP Logger  
- Request logging middleware
- Custom format for API requests
- Integration with Winston transports
- Response time tracking
- Status code logging

### Log File Organization
```
logs/
├── error.log     # Error level logs
├── combined.log  # All log levels
└── http.log      # Morgan HTTP logs
```

### Sample Log Entry
```json
{
  "timestamp": "2024-01-01T12:00:00.000Z",
  "level": "info",
  "message": "Order created successfully",
  "orderId": "123-456",
  "method": "POST",
  "path": "/api/orders"
}
```

Log levels: `error`, `warn`, `info`, `debug`

## 🔒 Security Features

- **Helmet.js** - Security headers
- **CORS** - Configurable cross-origin policies
- **Input validation** - Joi schema validation
- **File upload limits** - Multer security configurations


Built with ❤️ using Node.js, React, and AWS