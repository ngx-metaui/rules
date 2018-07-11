#!/usr/bin/env bash

set -u -e
args=("$@")


if [[ ${TRAVIS_TEST_RESULT=0} == 1 ]]; then
  exit 1;
fi

echo "################ Testing core ################ "
ng test core  --browsers=ChromeHeadlessCI,FirefoxHeadless --source-map=false --watch=false

echo "################ Testing components ################ "
ng test components --browsers=ChromeHeadlessCI,FirefoxHeadless --source-map=false --watch=false

echo "################  Testing metaui ################ "
ng test metaui --browsers=ChromeHeadlessCI,FirefoxHeadless --source-map=false --watch=false





