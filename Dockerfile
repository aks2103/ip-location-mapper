# Stage 1: Build the React application
FROM node:latest as build-stage

WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy project files and folders to the current working directory (i.e., "app" folder)
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:stable-alpine as production-stage

# Copy the built assets from the build-stage into the default serve directory
COPY --from=build-stage /app/build /usr/share/nginx/html

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy the Nginx configuration template file from your project
COPY nginx.conf.template /etc/nginx/conf.d/nginx.conf.template

# Expose any port. At runtime, Cloud Run will set the PORT environment variable to the port you should listen on.
EXPOSE ${PORT}

# Use 'envsubst' to replace the ${PORT} variable and start Nginx
CMD ["sh", "-c", "envsubst '\\$PORT' < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
