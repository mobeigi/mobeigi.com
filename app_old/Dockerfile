# Stage 1: Build the React app
FROM node:14.17.3-alpine AS builder

RUN apk add --no-cache git

# We require access to the git folder (i.e. for git commit hash)
WORKDIR /project
COPY --from=gitroot .git .

WORKDIR /project/app
COPY . .

RUN yarn install
RUN yarn build

# Stage 2: Nginx setup
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

COPY --from=builder /project/app/build .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
