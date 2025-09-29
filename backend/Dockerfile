# Use lightweight Node.js base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependency files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all backend files
COPY . .

# Make folder for SQLite DB
RUN mkdir -p /app/data

# Expose backend port
EXPOSE 5000

# Start backend
CMD ["npm", "start"]