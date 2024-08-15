# Base image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json /usr/src/app
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Uygulamayı build et
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

CMD ["npm", "start"]
