# BiSC-Taalhuizen

## Getting started

### Install dependencies & setup

Install all dependencies in `./client` and `./server`

```sh
cd client && npm install && cd server && npm install && cd ..

# Setup environment settings for the server
cd server && npm run copyenv
```

### Startup

```bash
cd client && npm start # To start the frontend
cd server && npm start:debug # To start the backend
cd client && npm run codegen # To generate graphql stuff
```

#### Alternative, quickstart the project with iTermocil

If you have iTermocil installed you can run `npm start` from the project root to quick start the project. This opens
multiple split windows and runs the start up commands.

### Important notes

This project doesn't have a database, instead we use APIs that are made available by Conduction to store and fetch data. In order to connect to their APIs you need to get a token from them and set this in `API_KEY` in `server/.env` file. See [server/README.md](server/README.md) for more backend info.

---

# Less important stuff below here

## Frontend setup

Pretty standard React app. These commands were used for the initial setup of the frontend app. We probably don't need them anymore but I added them anyway.

- `npx create-react-app bisc-taalhuizen --template typescript`
- `npm i react-router-dom @types/react-router-dom node-sass classnames @types/classnames @apollo/client graphql`
- `npm i --save-dev prettier @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo @graphql-codegen/fragment-matcher @graphql-codegen/introspection`

## Backend setup

Standard Typescript NestJS app. Added our own prettier/eslint configs.

## Build Docker containers

### Frontend

```
cd client
GIT_COMMIT_HASH=`git rev-parse HEAD`
docker build -t lifely/bisc-frontend:$GIT_COMMIT_HASH .
docker push lifely/bisc-frontend:$GIT_COMMIT_HASH
```

### Backend

```
cd server
GIT_COMMIT_HASH=`git rev-parse HEAD`
docker build -t lifely/bisc-backend:$GIT_COMMIT_HASH .
docker push lifely/bisc-backend:$GIT_COMMIT_HASH
```

### Deploy

**Server config**

On the server we might have to change the `MaxSessions` setting to `MaxSessions 500` in `/etc/ssh/sshd_config`, to allow docker-compose:

```
nano /etc/ssh/sshd_config
service ssh restart
```

See https://unix.stackexchange.com/a/87532

**Deploy**

```
GIT_COMMIT_HASH=`git rev-parse HEAD` DOCKER_HOST="ssh://root@157.245.65.224" DEPLOY_ENV="staging" DEPLOY_GRAPHQL_URI="https://bisc-staging.lifely.nl/graphql" docker-compose -f docker-compose-remote.yml up -d
```
