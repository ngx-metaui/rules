#!/usr/bin/env bash

set -u -e
args=("$@")


if [[ ${TRAVIS_TEST_RESULT=0} == 1 ]]; then
  exit 1;
fi

rm -Rf ./dist/libs
rm -Rf ./dist/apps

if [ ${args[0]} == "prod" ]; then
   echo "################ Building @ngx-meta/rules ################"
   ng build rules --prod

   echo "################ Building @ngx-meta/primeng-rules ################"
   ng build primeng-rules --prod

   echo "################ Building @ngx-meta/material-rules ################"
   ng build material-rules --prod

   echo "################ Building apps ################"
   ng build doc-app --prod
   ng build material-app --prod
   ng build metaui-evolution --prod
   ng build my-detail-page --prod

else
      echo "################ Building @ngx-meta/rules ################"
      ng build rules

      echo "################ Building @ngx-meta/primeng-rules ################"
      ng build primeng-rules

      echo "################ Building @ngx-meta/material-rules ################"
      ng build material-rules

    echo "################ Building apps ################"
      ng build doc-app
      ng build material-app
      ng build metaui-evolution
      ng build my-detail-page
fi

if [ ${args[0]} == "link" ]; then
   echo "################ Updating package.json with version ################"
   NEW_VERSION=$(node -p "require('./package.json').version")

   ANGULAR_VERSION=$(node -p "require('./package.json').dependencies['@angular/core']")
   PRIMENG_ICONS_VERSION=$(node -p "require('./package.json').dependencies['primeicons']")
   PRIMENG_VERSION=$(node -p "require('./package.json').dependencies['primeng']")
   MATERIAL_VERSION=$(node -p "require('./package.json').dependencies['@angular/material']")

   echo "Updating packages.json under dist/libs with version ${NEW_VERSION}"

   cd ./dist/
   perl -p -i -e "s/VERSION_PLACEHOLDER/${NEW_VERSION}/g" $(grep -ril VERSION_PLACEHOLDER .) < /dev/null 2> /dev/null
   perl -p -i -e "s/ANGULAR_VERSION_PLACEHOLDER/${ANGULAR_VERSION}/g" $(grep -ril ANGULAR_VERSION_PLACEHOLDER .) < /dev/null 2> /dev/null
   perl -p -i -e "s/PRIMENG_ICONS_VERSION_PLACEHOLDER/${PRIMENG_ICONS_VERSION}/g" $(grep -ril PRIMENG_ICONS_VERSION_PLACEHOLDER .) < /dev/null 2> /dev/null
   perl -p -i -e "s/PRIMENG_VERSION_PLACEHOLDER/${PRIMENG_VERSION}/g" $(grep -ril PRIMENG_VERSION_PLACEHOLDER .) < /dev/null 2> /dev/null
   perl -p -i -e "s/MATERIAL_VERSION_PLACEHOLDER/${MATERIAL_VERSION}/g" $(grep -ril MATERIAL_VERSION_PLACEHOLDER .) < /dev/null 2> /dev/null

   cd ..
fi

rm -Rf ./dist/apps


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







