# Example from https://www.tomray.dev/nestjs-docker-production
FROM node:18.18.0-alpine


# install puppeteer dependencies
RUN apk add \
      chromium \
      nss \
      freetype \
      freetype-dev \
      harfbuzz \
      ca-certificates \
      ttf-freefont

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV PUPPETEER_CHROMIUM_EXECUTABLE_PATH /usr/bin/chromium-browser

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm ci --legacy-peer-deps

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run prebuild && npm run build

CMD ["npm", "run", "start:prod:migrate"]
