FROM node:lts-iron as build

RUN yarn

WORKDIR /usr/app

ARG ENV=development

COPY package.json yarn.lock ./
RUN yarn config set network-timeout 300000
RUN NODE_ENV=development yarn --no-cache --frozen-lockfile

COPY ./ ./

RUN set -ex; \
  yarn build; \
  if [ "${ENV}" = "production" ]; then \
  rm -rf node_modules; \
  yarn --no-cache --frozen-lockfile; \
  fi


FROM node:iron-alpine as deploy

WORKDIR /usr/app

COPY --from=build /usr/app/package.json ./package.json
COPY --from=build /usr/app/node_modules ./node_modules
COPY --from=build /usr/app/dist ./dist
COPY --from=build /usr/app/config/ ./config
COPY --from=build /usr/app/src/**/*.gql ./schema
COPY --from=build /usr/app/prisma ./prisma

RUN ["yarn", "prisma", "generate"]

ENTRYPOINT [ "node", "dist/src/main.js" ]