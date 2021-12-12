FROM node:14-alpine
WORKDIR /app-bureau
COPY . .
RUN yarn install --production
CMD ["nodemon", "/app-bureau/main.js"]