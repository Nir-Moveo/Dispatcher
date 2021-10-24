FROM node:16.10.0-alpine3.13

# create root application folder
WORKDIR /usr/src/app

# copy configs to /app folder
COPY package*.json ./
COPY tsconfig.json ./


RUN npm install
# copy source code to /usr/src/app folder
COPY . .
RUN npm run build
RUN npm run docs


# check files list
RUN ls -a


# Second stage: run things.
FROM node:16.10.0-alpine3.13
WORKDIR /usr/src/app

# Install the Javascript dependencies, only runtime libraries.
COPY package.json .
RUN npm install --production

# Copy the dist tree from the first stage.
COPY --from=0 /usr/src/app/dist dist
COPY --from=0 /usr/src/app/webApidoc webApidoc
RUN ls -a
CMD ["npm", "run", "start"]