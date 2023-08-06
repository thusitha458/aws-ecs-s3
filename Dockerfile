FROM node:18-alpine
WORKDIR /app
COPY . .
RUN yarn
RUN yarn cache clean
CMD ["yarn", "start"]