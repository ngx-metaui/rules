#!/usr/bin/env bash

set -u -e
args=("$@")


if [[ ${TRAVIS_TEST_RESULT=0} == 1 ]]; then
  exit 1;
fi

rm -Rf ./dist/@aribaui

if [ ${args[0]} == "prod" ]; then
   echo "################ Building core module ################"
   ng build core --prod

   echo "################ Building components module ################"
   ng build components --prod

   echo "################ Building resources module ################"
   npm run build.resources

   echo "################  Building metaui module ################"
   ng build metaui --prod

else
   echo "################ Building core module ################"
   ng build core

   echo "################ Building components module ################"
   ng build components

   echo "################ Building resources module ################"
   npm run build.resources

   echo "################  Building metaui module ################"
   ng build metaui
fi




