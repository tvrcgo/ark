FROM node:slim
LABEL maintainer="tvrcgo <tvrcgo@gmail.com>"

COPY ./* /app/
RUN cd /app \
  && npm i \
  && npm run deploy \
  && cd server \
  && npm i --production
CMD node /app/server/index.js
