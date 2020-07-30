FROM node:14.6.0-stretch
ENV APP_ROOT /web
ENV NODE_ENV production
WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}
RUN npm install
RUN npm audit fix
RUN npm run build
CMD ["npm", "run", "start"]
