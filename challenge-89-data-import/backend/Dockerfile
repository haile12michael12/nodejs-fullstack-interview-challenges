FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Create directories
RUN mkdir -p uploads logs

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]