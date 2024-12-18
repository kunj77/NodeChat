# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY ../package.json ../package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . /app

# Copy the shared database models
COPY ../db /app/db

# Build the TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE 5002

# Start the application
CMD ["npm", "start"]