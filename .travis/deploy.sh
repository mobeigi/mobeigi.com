#!/usr/bin/env bash

# Init SSH
eval "$(ssh-agent -s)"
ssh-add

# Deploy app
rsync -avz --delete -e ssh $TRAVIS_BUILD_DIR/app/build/ git@$IP:$APP_DEPLOY_DIR

# Deploy server
ssh git@$IP sudo systemctl stop mobeigi-express
rsync -avz --delete -e ssh $TRAVIS_BUILD_DIR/server/ git@$IP:$SERVER_DEPLOY_DIR
ssh git@$IP /bin/bash << EOF
    cd $SERVER_DEPLOY_DIR
    /bin/cp -rf ../server_private_files/* .
    yarn install
    sudo systemctl start mobeigi-express
    systemctl is-active mobeigi-express
EOF
