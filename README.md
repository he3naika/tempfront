## Requirements
* nodejs 8+
* npm 5+
* docker CE 17+

## Usage
* `npm install` to fetch dependencies
* `npm start` to launch API in docker container and start react dev server
* `npm stop` to stop API docker container
* `npm run build` to build production bundle and package it inside docker container

## Production bundle
Production docker image is built on top of nginx. It serves all static assets and proxies request for `/api/*` to `http://api:8080/api/*`. Therefore, it requires an `api` container in the same virtual network.
