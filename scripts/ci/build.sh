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

if [ ${args[0]} == "link" ]; then
   echo "################ Updating package.json with version ################"
   NEW_VERSION=$(node -p "require('./package.json').version")
   echo "Updating packages.json under dist/libs/rules with version ${NEW_VERSION}"

   cd ./dist/
   perl -p -i -e "s/VERSION_PLACEHOLDER/${NEW_VERSION}/g" $(grep -ril VERSION_PLACEHOLDER .) < /dev/null 2> /dev/null
fi


cd ..
# Copy resources
echo "Building resources"
rm -Rf ./dist/libs/rules/lib/resources && cp -R libs/rules/src/lib/resources ./dist/libs/rules/lib/resources && ./node_modules/.bin/scss-bundle -e  ./dist/libs/rules/lib/resources/styles/aribaui.scss -d ./dist/libs/rules/lib/resources/styles/aribaui.css
cp -R libs/rules/src/lib/metaui/core/oss ./dist/libs/rules/lib/metaui/core/oss


# Build schematics
echo "Building schematics"
npm run build:schematics







