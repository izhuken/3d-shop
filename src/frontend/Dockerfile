FROM node:23-alpine as build

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm i

COPY . .

RUN npm run build

FROM nginx:stable-alpine3.20-slim

RUN apk upgrade --no-cache && \
    apk add --no-cache libgcc libstdc++

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

ENTRYPOINT ["nginx", "-g", "daemon off;"]