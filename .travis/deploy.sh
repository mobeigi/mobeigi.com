#!/usr/bin/env bash

# Init SSH
eval "$(ssh-agent -s)"
ssh-add

# Copy files to deployment directory
rsync -avz --delete -e ssh $TRAVIS_BUILD_DIR/app/build/ git@$IP:$DEPLOY_DIR
