#!/bin/bash

rm -rf logs/* logs/.*
rm -rf prod/* prod/.*
touch prod/.env
cp -v prod.env prod/.env

cp -R api prod
cp -R logs prod
cp -R middleware prod
cp -R models prod
cp -R utils prod

cp app.js prod
cp db.js prod
cp package.json prod

cd prod
npm install
tar czf app.tar.gz api/ logs/ middleware/ models/ node_modules/ utils/ app.js db.js package.json .env

scp app.tar.gz nastromo@165.22.18.107:~/tips
rm app.tar.gz

ssh nastromo@165.22.18.107 << 'ENDSSH'
cd tips
rm -rf backend/* backend/.*
tar xf app.tar.gz -C backend
pm2 stop tips
rm app.tar.gz
pm2 start tips
ENDSSH