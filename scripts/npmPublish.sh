#!/usr/bin/env bash

set -u -e

scriptDir=$(cd $(dirname $0); pwd)

echo "CDing to $scriptDir to start from CI dir to the root"
cd ${scriptDir}
cd ..


PACKAGES=(rules)

rm -Rf ./dist

echo "##### Validating packages"
./scripts/ci/lint.sh

echo "##### Building packages to dist"
./scripts/ci/build.sh dev

echo "##### Testing packages"
ng test rules --source-map=false --watch=false --progress=false



NEW_VERSION=$(node -p "require('./package.json').version")
echo "Updating packages.json under dist/libs/rules with version ${NEW_VERSION}"

cd ./dist/
perl -p -i -e "s/VERSION_PLACEHOLDER/${NEW_VERSION}/g" $(grep -ril VERSION_PLACEHOLDER .) < /dev/null 2> /dev/null


cd "libs"

pwd
for P in ${PACKAGES[@]};
do
    echo publish "@ngx-meta/${P}"
    cd ${P}
    npm publish --accesss public
    cd ..
done
