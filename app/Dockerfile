# Stage 1: Build the Next.js app
FROM node:24-alpine AS builder

# We require access to the git folder (i.e. for git commit hash)
RUN apk add --no-cache git

WORKDIR /project
COPY --from=gitroot .git .

WORKDIR /project/app
COPY . .

RUN corepack enable

RUN yarn install
RUN yarn build

# Stage 2: Run the Next.js app
FROM node:24-alpine AS runner

WORKDIR /app

COPY --from=builder /project/app/.next/standalone ./
COPY --from=builder /project/app/.next/static ./.next/static

# Public / private file setup
RUN rm -rf ./public ./private
COPY --from=builder /project/app/public ./public

ENV NODE_ENV=production

EXPOSE 3000
ENV PORT=3000

ENV HOSTNAME="0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]