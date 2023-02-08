
#update repository
git pull
yarn
yarn tsc
yarn build

pm2 restart entipic-www
