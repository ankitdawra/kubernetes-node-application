FROM node:lts-alpine3.17
ENV NODE_ENV=5000

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .
EXPOSE 5000
CMD ["npm", "start"]