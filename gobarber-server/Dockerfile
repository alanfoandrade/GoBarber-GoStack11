FROM node:lts-alpine

WORKDIR /home/node/api

RUN mkdir -p node_modules && chown -R node:node .

COPY package.json yarn.* ./
USER node
RUN yarn

COPY --chown=node:node . .

EXPOSE 3333

CMD ["yarn", "start"]
