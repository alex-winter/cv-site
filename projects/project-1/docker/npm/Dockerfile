FROM node:22.14.0

WORKDIR /app

COPY package*.json ./

RUN mkdir -p /var/www/html/public/dist

RUN npm install 

CMD ["npm", "start"]