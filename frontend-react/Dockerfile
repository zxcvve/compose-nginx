FROM node AS build
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
ARG SERVER_IP
ARG SERVER_PORT

RUN echo VITE_SERVER_IP = $SERVER_IP >> .env
RUN echo VITE_SERVER_PORT = $SERVER_PORT >> .env
RUN npm run build

FROM nginx:1.25.2-alpine-slim

COPY --from=build /app/dist ./usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]