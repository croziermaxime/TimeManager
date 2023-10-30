FROM node:lts-alpine as build-stage
WORKDIR /app
COPY . .
#COPY package*.json ./
RUN npm install
RUN npm run build

# étape de production
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./default.conf ./etc/nginx/conf.d/
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

#FROM node:lts-alpine
#WORKDIR /app
#COPY . .
#RUN npm install
#
#EXPOSE 8000
#CMD [ "npm", "install" ]
#CMD [ "npm", "run", "dev" ]