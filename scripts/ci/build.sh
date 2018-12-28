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
   ng build primeng-rules --prod
   ng build material-rules --prod

else
   echo "################ Building @ngx-meta/rules ################"
      ng build rules
      ng build primeng-rules
      ng build material-rules
fi

if [ ${args[0]} == "link" ]; then
   echo "################ Updating package.json with version ################"
   NEW_VERSION=$(node -p "require('./package.json').version")
   echo "Updating packages.json under dist/libs with version ${NEW_VERSION}"

   cd ./dist/
   perl -p -i -e "s/VERSION_PLACEHOLDER/${NEW_VERSION}/g" $(grep -ril VERSION_PLACEHOLDER .) < /dev/null 2> /dev/null

   cd ..
fi


# Copy resources for rules
echo "Building resources for rules"
rm -Rf ./dist/libs/rules/lib/resources && cp -R libs/rules/src/lib/resources ./dist/libs/rules/lib/resources
cp -R libs/rules/src/lib/metaui/core/oss ./dist/libs/rules/lib/metaui/core/oss


# Copy resources for primeng rules
echo "Building resources for primeng"
rm -Rf ./dist/libs/primeng-rules/lib/resources && cp -R libs/primeng-rules/src/lib/resources ./dist/libs/primeng-rules/lib/resources && ./node_modules/.bin/scss-bundle -e  ./dist/libs/primeng-rules/lib/resources/styles/aribaui.scss -d ./dist/libs/primeng-rules/lib/resources/styles/aribaui.css
cp -R libs/primeng-rules/src/lib/metaui/oss ./dist/libs/primeng-rules/lib/metaui/oss

# Copy resources for material rules
echo "Building resources for material"
cp -R libs/material-rules/src/lib/metaui/oss ./dist/libs/material-rules/lib/metaui/oss



# Build schematics
echo "Building schematics"
npm run build:schematics







