#!/usr/bin/env bash

set -u -e
args=("$@")


if [[ ${TRAVIS_TEST_RESULT=0} == 1 ]]; then
  exit 1;
fi

echo "################ Testing @ngx-meta/rules ################ "
 ng test rules --browsers=ChromeHeadlessCI --karma-config=./libs/rules/karma.conf.ci.js --source-map=false --watch=false --progress=false




