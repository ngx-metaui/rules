#!/usr/bin/env bash

set -u -e

scriptDir=$(cd $(dirname $0); pwd)

echo "CDing to $scriptDir to start from CI dir to the root"
cd ${scriptDir}
cd ..


PACKAGES=(rules primeng-rules material-rules)

rm -Rf ./dist

echo "##### Validating packages"
./scripts/ci/lint.sh

echo "##### Building packages to dist"
./scripts/ci/build.sh dev

echo "##### Testing packages"
ng test rules --source-map=false --watch=false --progress=false
ng test primeng-rules --source-map=false --watch=false --progress=false




NEW_VERSION=$(node -p "require('./package.json').version")
echo "Updating packages.json under dist/libs with version ${NEW_VERSION}"


ANGULAR_VERSION=$(node -p "require('./package.json').dependencies['@angular/core']")
PRIMENG_ICONS_VERSION=$(node -p "require('./package.json').dependencies['primeicons']")
PRIMENG_VERSION=$(node -p "require('./package.json').dependencies['primeng']")
MATERIAL_VERSION=$(node -p "require('./package.json').dependencies['@angular/material']")

cd ./dist/

grep -rl 'VERSION_PLACEHOLDER' . | xargs  perl -p -i -e "s/VERSION_PLACEHOLDER/${NEW_VERSION}/g"
grep -rl 'ANGULAR_PLACEHOLDER' . | xargs  perl -p -i -e "s/ANGULAR_PLACEHOLDER/${ANGULAR_VERSION}/g"
grep -rl 'PRIMENG_ICONS_PLACEHOLDER' . | xargs  perl -p -i -e "s/PRIMENG_ICONS_PLACEHOLDER/${PRIMENG_ICONS_VERSION}/g"
grep -rl 'PRIMENG_PLACEHOLDER' . | xargs  perl -p -i -e "s/PRIMENG_PLACEHOLDER/${PRIMENG_VERSION}/g"
grep -rl 'MATERIAL_PLACEHOLDER' . | xargs  perl -p -i -e "s/MATERIAL_PLACEHOLDER/${MATERIAL_VERSION}/g"


cd "libs"

pwd
for P in ${PACKAGES[@]};
do
    echo publish "@ngx-metaui/${P}"
    cd ${P}
    npm publish --access public
    cd ..
done
