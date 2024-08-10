FROM node:14-bullseye-slim

# Install dependencies and build tools
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /server

COPY . .

RUN yarn install
RUN yarn build

ENV NODE_ENV=production
EXPOSE 3000

CMD ["yarn", "start"]
