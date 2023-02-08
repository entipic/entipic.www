
#update repository
git pull
yarn
yarn tsc
yarn build

pm2 restart ./pm2.json
