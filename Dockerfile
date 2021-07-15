# Multistage build

# First stage: client (compile client code)
FROM node:latest as client

# Use app directory
WORKDIR /usr/app

# Install client dependencies
COPY client/package*.json ./
RUN npm install

# Build client code
COPY client/src ./src
COPY client/index.html ./
COPY server/tsconfig.json ./
COPY client/webpack.config.js ./
RUN npm run build

# Second stage: node server
FROM node:latest

# Use app directory
WORKDIR /usr/app

# Create folder for tatic files
RUN mkdir -p public/build/js

# Copy the client assets to the public (static) directory
COPY --from=client /usr/app/index.html ./public 
COPY --from=client /usr/app/build/js ./public/build/js

# Install app dependencies
COPY server/package*.json ./
RUN npm install

# Bundle app source
COPY server/tsconfig.json ./
COPY server/src ./src

CMD [ "npm", "run", "serve" ]
