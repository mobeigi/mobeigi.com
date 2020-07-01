#!/bin/bash
eval "$(ssh-agent -s)"
chmod 600 .travis/id_rsa
ssh-add .travis/id_rsa

git config --global push.default matching
git remote add deploy ssh://git@$IP:$PORT$DEPLOY_DIR
git push deploy master

# Post Deployment Steps
ssh apps@$IP -p $PORT <<EOF
  cd $DEPLOY_DIR
  echo "Test"
EOF