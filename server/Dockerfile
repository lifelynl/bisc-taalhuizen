FROM node:12.20-alpine

WORKDIR /app
# Dependencies first (cachable Docker layer)
COPY package.json package-lock.json /app/
RUN npm i

COPY . /app
RUN npm run build

ENTRYPOINT ["npm"]
CMD ["run", "start:prod"]