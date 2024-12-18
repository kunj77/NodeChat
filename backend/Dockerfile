# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set build arguments
ARG SERVICE_NAME
ARG PORT

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json from the backend directory
COPY package*.json tsconfig.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code from the backend directory
COPY src/lib ./src/lib
COPY src/services/${SERVICE_NAME} ./src/services/${SERVICE_NAME}

# Stage 2: Create the final image
FROM node:18-alpine

# Set build arguments
ARG SERVICE_NAME
ARG PORT

# Set the working directory
WORKDIR /app/src/services/${SERVICE_NAME}

# Copy the built application from the builder stage
COPY --from=builder /app /app

# Expose the port the app runs on
EXPOSE ${PORT}

# Start the application
CMD ["/app/node_modules/.bin/tsx", "src/app.ts"]