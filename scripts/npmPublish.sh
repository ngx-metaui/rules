#!/usr/bin/env bash

set -u -e

scriptDir=$(cd $(dirname $0); pwd)
echo "CDing to $scriptDir"
cd ${scriptDir}


PACKAGES=(core components metaui resources)

rm -Rf ../dist

echo "##### Validating packages"
./ci/lint.sh

echo "##### Building packages to dist"
./ci/build.sh dev

cd ..
echo "##### Testing packages"
ng test core --source-map=false --watch=false --progress=false && ng test components --source-map=false --watch=false --progress=false  && ng test metaui --source-map=false --watch=false --progress=false



NEW_VERSION=$(node -p "require('./package.json').version")
echo "Updating packages.json under dist/@aribaui with version ${NEW_VERSION}"

cd ./dist
perl -p -i -e "s/VERSION_PLACEHOLDER/${NEW_VERSION}/g" $(grep -ril VERSION_PLACEHOLDER .) < /dev/null 2> /dev/null



cd "@aribaui"

pwd
for P in ${PACKAGES[@]};
do
    echo publish "@aribaui/${P}"
    cd ${P}
    npm publish
    cd ..
done
