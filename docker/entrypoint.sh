#!/bin/bash

rsync -arv /usr/src/cache/node_modules /usr/src/app
exec npm start