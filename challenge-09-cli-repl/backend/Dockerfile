# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json first for better caching
COPY package.json .

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Create data directory
RUN mkdir -p /app/data

# Make the script executable
RUN chmod +x repl.js

# Set environment variables
ENV NODE_ENV=production

# Expose port (if needed for future web interface)
EXPOSE 3000

# Default command
CMD ["node", "repl.js"]
