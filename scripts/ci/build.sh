#!/usr/bin/env bash

set -u -e
args=("$@")


if [[ ${TRAVIS_TEST_RESULT=0} == 1 ]]; then
  exit 1;
fi

rm -Rf ./dist/libs
rm -Rf ./dist/apps

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

# Build schematics
echo "Building schematics"
npm run build:schematics




echo "################ Finished  builds ################"


if [ ${args[0]} == "link" ]; then
   echo "################ Updating package.json with version ################"
   NEW_VERSION=$(node -p "require('./package.json').version")

   ANGULAR_VERSION=$(node -p "require('./package.json').dependencies['@angular/core']")
   PRIMENG_ICONS_VERSION=$(node -p "require('./package.json').dependencies['primeicons']")
   PRIMENG_VERSION=$(node -p "require('./package.json').dependencies['primeng']")
   MATERIAL_VERSION=$(node -p "require('./package.json').dependencies['@angular/material']")

   echo "Updating packages.json under dist/libs with version ${NEW_VERSION}"

   cd ./dist/
   grep -rl 'VERSION_PLACEHOLDER' . | xargs  perl -p -i -e "s/VERSION_PLACEHOLDER/${NEW_VERSION}/g"
   grep -rl 'ANGULAR_PLACEHOLDER' . | xargs  perl -p -i -e "s/ANGULAR_PLACEHOLDER/${ANGULAR_VERSION}/g"
   grep -rl 'PRIMENG_ICONS_PLACEHOLDER' . | xargs  perl -p -i -e "s/PRIMENG_ICONS_PLACEHOLDER/${PRIMENG_ICONS_VERSION}/g"
   grep -rl 'PRIMENG_PLACEHOLDER' . | xargs  perl -p -i -e "s/PRIMENG_PLACEHOLDER/${PRIMENG_VERSION}/g"
   grep -rl 'MATERIAL_PLACEHOLDER' . | xargs  perl -p -i -e "s/MATERIAL_PLACEHOLDER/${MATERIAL_VERSION}/g"

   cd ..
fi


rm -Rf ./dist/apps


# Copy resources for rules
echo "Building resources for rules"
rm -Rf ./dist/libs/rules/lib/resources
cp -R libs/rules/src/lib/metaui/core/*.oss ./dist/libs/rules/lib/metaui/core
cp -R libs/rules/src/lib/resources/bin ./dist/libs/rules/lib/bin


# Copy resources for primeng rules
echo "Building resources for primeng"
rm -Rf ./dist/libs/primeng-rules/lib/resources && cp -R libs/primeng-rules/src/lib/resources ./dist/libs/primeng-rules/lib/resources && ./node_modules/.bin/scss-bundle -e  ./dist/libs/primeng-rules/lib/resources/styles/aribaui.scss -d ./dist/libs/primeng-rules/lib/resources/styles/aribaui.css
cp -R libs/primeng-rules/src/lib/metaui/*.oss ./dist/libs/primeng-rules/lib/metaui

# Copy resources for material rules
echo "Building resources for material"
cp -R libs/material-rules/src/lib/metaui/*.oss ./dist/libs/material-rules/lib/metaui










