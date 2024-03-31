# Stage 1: Build the React application
FROM node:latest as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to work directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy project files into the docker image
COPY . .

# Build the application for production
RUN npm run build

# Stage 2: Serve the build using Nginx
FROM nginx:stable-alpine

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outer world
EXPOSE 80

# Start Nginx and keep it running in the foreground
CMD ["nginx", "-g", "daemon off;"]
