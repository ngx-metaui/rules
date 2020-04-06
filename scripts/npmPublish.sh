#!/usr/bin/env bash

set -u -e

scriptDir=$(cd $(dirname $0); pwd)

echo "CDing to $scriptDir to start from CI dir to the root"
cd ${scriptDir}
cd ..


PACKAGES=(rules material-rules fiori-rules)

rm -Rf ./dist

echo "##### Validating packages"
./scripts/ci/lint.sh


echo "##### Testing packages"
./scripts/ci/test.sh

echo "##### Building packages to dist"
./scripts/ci/build.sh release




NEW_VERSION=$(node -p "require('./package.json').version")
echo "Updating packages.json under dist/libs with version ${NEW_VERSION}"


ANGULAR_VERSION=$(node -p "require('./package.json').dependencies['@angular/core']")
MATERIAL_VERSION=$(node -p "require('./package.json').dependencies['@angular/material']")
FD_CORE_VERSION=$(node -p "require('./package.json').dependencies['@fundamental-ngx/core']")
FD_PLATFORM_VERSION=$(node -p "require('./package.json').dependencies['@fundamental-ngx/platform']")
SAP_THEMNE_VERSION=$(node -p "require('./package.json').dependencies['@sap-theming/theming-base-content']")

cd ./dist/

grep -rl 'VERSION_PLACEHOLDER' . | xargs  perl -p -i -e "s/VERSION_PLACEHOLDER/${NEW_VERSION}/g"
grep -rl 'ANGULAR_PLACEHOLDER' . | xargs  perl -p -i -e "s/ANGULAR_PLACEHOLDER/${ANGULAR_VERSION}/g"
grep -rl 'MATERIAL_PLACEHOLDER' . | xargs  perl -p -i -e "s/MATERIAL_PLACEHOLDER/${MATERIAL_VERSION}/g"

grep -rl 'FD_CORE_PLACEHOLDER' . | xargs  perl -p -i -e "s/FD_CORE_PLACEHOLDER/${FD_CORE_VERSION}/g"
grep -rl 'FD_PLATFORM_PLACEHOLDER' . | xargs  perl -p -i -e "s/FD_PLATFORM_PLACEHOLDER/${FD_PLATFORM_VERSION}/g"
grep -rl 'SAP_THEMNE_PLACEHOLDER' . | xargs  perl -p -i -e "s/SAP_THEMNE_PLACEHOLDER/${SAP_THEMNE_VERSION}/g"


cd "libs"

pwd
for P in ${PACKAGES[@]};
do
    echo publish "@ngx-metaui/${P}"
    cd ${P}
    npm publish --access public
    cd ..
done
