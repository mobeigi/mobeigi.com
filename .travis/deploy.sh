#!/bin/bash
eval "$(ssh-agent -s)"
chmod 600 id_rsa
ssh-add id_rsa

git config --global push.default matching
git remote add deploy ssh://git@$IP:$PORT$DEPLOY_DIR
git push deploy master

# Post Deployment Steps
ssh apps@$IP -p $PORT <<EOF
  cd $DEPLOY_DIR
  echo "Test"
EOF