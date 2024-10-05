# Stage 1: Build the Next.js app
FROM node:22-alpine AS builder

# We require access to the git folder (i.e. for git commit hash)
RUN apk add --no-cache git

WORKDIR /project
COPY --from=gitroot .git .

WORKDIR /project/app
COPY . .

RUN yarn install
RUN yarn build

# Stage 2: Run the Next.js app
FROM node:22-alpine AS runner

RUN apk add --no-cache git

WORKDIR /project
COPY --from=gitroot .git .

WORKDIR /project/app

COPY --from=builder /project/app/.next ./.next
COPY --from=builder /project/app/node_modules ./node_modules
COPY --from=builder /project/app/package.json ./package.json
COPY --from=builder /project/app/public ./public
COPY --from=builder /project/app/next.config.mjs ./next.config.mjs
COPY --from=builder /project/app/svgr.config.mjs ./svgr.config.mjs

EXPOSE 3000

CMD ["yarn", "start"]