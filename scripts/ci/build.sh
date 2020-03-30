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

echo "################ Building @ngx-meta/material-rules ################"
ng build material-rules

echo "################ Building @ngx-meta/fiori-rules ################"
ng build fiori-rules

echo "################ Building apps ################"
ng build doc-app
ng build material-app
ng build fiori-app

# Build schematics
echo "Building schematics"
npm run build:schematics




echo "################ Finished  builds ################"


if [ ${args[0]} == "link" ]; then
   echo "################ Updating package.json with version ################"
   NEW_VERSION=$(node -p "require('./package.json').version")

   ANGULAR_VERSION=$(node -p "require('./package.json').dependencies['@angular/core']")
   MATERIAL_VERSION=$(node -p "require('./package.json').dependencies['@angular/material']")
   FD_CORE_VERSION=$(node -p "require('./package.json').dependencies['@fundamental-ngx/core']")
   FD_PLATFORM_VERSION=$(node -p "require('./package.json').dependencies['@fundamental-ngx/platform']")
   SAP_THEMNE_VERSION=$(node -p "require('./package.json').dependencies['@sap-theming/theming-base-content']")

   echo "Updating packages.json under dist/libs with version ${NEW_VERSION}"

   cd ./dist/
   grep -rl 'VERSION_PLACEHOLDER' . | xargs  perl -p -i -e "s/VERSION_PLACEHOLDER/${NEW_VERSION}/g"
   grep -rl 'ANGULAR_PLACEHOLDER' . | xargs  perl -p -i -e "s/ANGULAR_PLACEHOLDER/${ANGULAR_VERSION}/g"
   grep -rl 'MATERIAL_PLACEHOLDER' . | xargs  perl -p -i -e "s/MATERIAL_PLACEHOLDER/${MATERIAL_VERSION}/g"

   grep -rl 'FD_CORE_PLACEHOLDER' . | xargs  perl -p -i -e "s/FD_CORE_PLACEHOLDER/${FD_CORE_VERSION}/g"
   grep -rl 'FD_PLATFORM_PLACEHOLDER' . | xargs  perl -p -i -e "s/FD_PLATFORM_PLACEHOLDER/${FD_PLATFORM_VERSION}/g"
   grep -rl 'SAP_THEMNE_PLACEHOLDER' . | xargs  perl -p -i -e "s/SAP_THEMNE_PLACEHOLDER/${SAP_THEMNE_VERSION}/g"

   cd ..
fi


rm -Rf ./dist/apps


# Copy resources for rules
echo "Building resources for rules"
rm -Rf ./dist/libs/rules/lib/resources
cp -R libs/rules/src/lib/metaui/core/*.oss ./dist/libs/rules/lib/metaui/core
cp -R libs/rules/src/lib/resources/bin ./dist/libs/rules/lib/bin


# Copy resources for material rules
echo "Building resources for material"
cp -R libs/material-rules/src/lib/metaui/*.oss ./dist/libs/material-rules/lib/metaui


# Copy resources for material rules
echo "Building resources for fiori"
cp -R libs/fiori-rules/src/lib/metaui/*.oss ./dist/libs/fiori-rules/lib/metaui








