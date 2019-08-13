#!/bin/bash

'cp' ../certs/appsettings.json .
nginx >> ../certs/nginx.log 2>&1 &
node server.js >> ../certs/machete.log 2>&1
