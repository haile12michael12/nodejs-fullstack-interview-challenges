# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json first for better caching
COPY package.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Create logs directory
RUN mkdir -p logs

# Expose port
EXPOSE 3001

# Start the application
CMD ["npm", "start"]