#!/usr/bin/env bash

# Init SSH
eval "$(ssh-agent -s)"
ssh-add

# Deployment
ssh git@$IP /bin/bash << EOF
    # Deploy app
    rsync -avz --delete -e ssh $TRAVIS_BUILD_DIR/app/build/ git@$IP:$APP_DEPLOY_DIR

    # Deploy server
    sudo systemctl stop mobeigi-express
    rsync -avz --delete -e ssh $TRAVIS_BUILD_DIR/server/ git@$IP:$SERVER_DEPLOY_DIR
    cd $SERVER_DEPLOY_DIR
    yarn install
    sudo systemctl start mobeigi-express
EOF
