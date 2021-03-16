# Nodejs build stage
FROM node:12.20-alpine as build-deps

WORKDIR /usr/src/app
# Dependencies first (cachable Docker layer)
COPY package.json package-lock.json ./
RUN npm i

COPY . ./
RUN npm run extract-translations && npm run compile-translations

RUN npm run build

# Nginx build stage
FROM nginx:1.19.3

ENV NGINX_PROXY_PASS **None**
ENV NGINX_ENVJS_GRAPHQL_URI **None**
ENV NGINX_ENVJS_VERSION **None**
ENV NGINX_ENVJS_ENV **None**

COPY nginx-default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
# COPY build/ /usr/share/nginx/html/