#!/usr/bin/env bash

set -u -e
args=("$@")


if [[ ${TRAVIS_TEST_RESULT=0} == 1 ]]; then
  exit 1;
fi

rm -Rf ./dist/libs

if [ ${args[0]} == "prod" ]; then
   echo "################ Building @ngx-meta/rules ################"
   ng build rules --prod

else
   echo "################ Building @ngx-meta/rules ################"
      ng build rules
fi




