#!/usr/bin/env bash

set -u -e
args=("$@")

if [ $# -eq 0 ]
  then
    printf "No arguments supplied\n"
    exit 1
fi

scriptDir=$(cd $(dirname $0); pwd)

echo "CDing to $scriptDir to start from CI dir to the root"
cd ${scriptDir}
cd ..

rm -Rf ./dist

echo "##### Linting ..."
./scripts/ci/lint.sh

echo "##### Building all  to dist ..."
./scripts/ci/build.sh dev

echo "##### Testing ..."
./scripts/ci/test.sh

if [ ${args[0]} != "patch" ] &&  [ ${args[0]} != "minor" ] &&  [ ${args[0]} != "major" ] && [ ${args[0]} != "pre" ]; then

    echo "Missing mandatory argument: . "
    echo " - Usage: ./release.sh  [type]  [pre]"
    echo "      type: patch | minor | major | none"
    echo "      pre: tells to to create pre-release (beta)"
    exit 1
fi

if [ "$#" -eq  "1" ] && [ ${args[0]} != "pre" ]; then
     ./node_modules/.bin/standard-version  --release-as ${args[0]}

else if [ "$#" -eq  "2" ] && [ ${args[1]} == "pre" ]; then
     ./node_modules/.bin/standard-version  --release-as ${args[0]} -p beta

else if [ "$#" -eq  "1" ] && [ ${args[0]} == "pre" ]; then
    ./node_modules/.bin/standard-version -p beta
else
    echo "Invalid params"
fi
fi
fi

NEW_VERSION=$(node -p "require('./package.json').version")
echo "Bumping up package(s).json to version ${NEW_VERSION}"

echo "Tagging Repo with git tag v${NEW_VERSION}"
git tag v${NEW_VERSION}

printf "=============== Now go to CHANGELOG.md and check if everything is ok then run following commands:================\n\n"
printf "  git add . &&  git commit -m \"chore(release): v${NEW_VERSION}\"\n\n"
printf "  git push --follow-tags origin master && git push origin --tags\n\n"
