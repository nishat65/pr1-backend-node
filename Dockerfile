FROM node:21-bullseye-slim

WORKDIR /app/

COPY . .

RUN npm install

EXPOSE 8000

CMD [ "npm", "start" ]