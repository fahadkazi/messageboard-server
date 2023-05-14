FROM node as builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY . .

RUN yarn build

FROM node:slim

ENV NODE_ENV production
USER node

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ormconfig.json ./

RUN yarn --production --frozen-lockfile

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 4000
CMD [ "node", "dist/index.js" ]