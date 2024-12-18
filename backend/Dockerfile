# Use the official Node.js image as the base image
FROM node:18-alpine

# Set build arguments
ARG SERVICE_NAME
ARG PORT

# Set the working directory
WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm ci --omit dev
COPY src/lib ./src/lib
COPY src/services/${SERVICE} ./src/services/${SERVICE}

ARG SERVICE
ENV NODE_PATH=build/
WORKDIR /app/src/services/${SERVICE}
COPY --from=builder /app /app

# Expose the port the app runs on
EXPOSE ${PORT}

# Start the application
CMD ["npx", "ts-node", "/src/app.ts"]