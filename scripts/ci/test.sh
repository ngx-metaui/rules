#!/usr/bin/env bash

set -u -e
args=("$@")


if [[ ${TRAVIS_TEST_RESULT=0} == 1 ]]; then
  exit 1;
fi

echo "################ Testing @ngx-meta/rules ################ "
ng test rules --browsers=ChromeHeadless --karma-config=./libs/rules/karma.conf.ci.js --source-map=false --watch=false --progress=false

echo "################ Testing @ngx-meta/primeng-rules ################ "
ng test primeng-rules --browsers=ChromeHeadless --karma-config=./libs/primeng-rules/karma.conf.ci.js --source-map=false --watch=false --progress=false


#echo "################ Testing @ngx-meta/material-rules ################ "
# ng test material-rules --browsers=ChromeHeadless --karma-config=./libs/material-rules/karma.conf.ci.js --source-map=false --watch=false --progress=false


#echo "################ Testing @ngx-meta/fiori-rules ################ "
#ng test fiori-rules --browsers=ChromeHeadless --karma-config=./libs/fiori-rules/karma.conf.ci.js --source-map=false --watch=false --progress=false
