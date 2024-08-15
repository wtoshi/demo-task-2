# auth-service/Dockerfile

# Base image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Uygulamayı build et
RUN npm run build

# Expose the port the app runs on
EXPOSE 5001

# Run the application
CMD ["npm", "run", "start:prod"]
