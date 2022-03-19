#!/bin/sh
cd ${PWD}
git pull
echo "Removing volume build_tagon..."
docker volume rm build_tagon
echo "Remove volume... DONE!"
echo "Building image..."
docker build -t tagonfebuild .
echo "Building image... DONE!"
docker run -d --rm -v build_tagon:/app/target/classes/static tagonfebuild
echo "Removing old build..."
rm -rf ../autoSSL/data/certbot/www/*
echo "Copying new build"
cp -r /var/lib/docker/volumes/build_tagon/_data/* ../autoSSL/data/certbot/www/
