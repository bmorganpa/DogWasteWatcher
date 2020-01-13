FROM node:10

EXPOSE 8080

RUN npm install -g now

CMD ["npm", "start"]
