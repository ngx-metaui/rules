## How to release new version to GIT

Since we are using `standard-version` the process is pretty straight forward since it only:
* Modifies root `package.json`
* Tag project with a specific version
* Generate `CHANGELOG`

#### Steps

* Run _release.sh_ command from the root of the project and pass an option if you want to create a `patch, minor or major `version

````
  ./scripts/release.sh <version>
  
  ex:
  ./scripts/release.sh patch
  ./scripts/release.sh minor
  ./scripts/release.sh major

````

* Check generated `CHANGELOG.md` for any errors or if you need to add some additional informations
* Follow instructions printed in the console. Probably you will see something like this:

```
  =============== Now go to CHANGELOG.md and check if everything is ok then run following commands:================"
 git add . &&  git commit -m \"chore(release): v<VERSION>
 git push --follow-tags origin master && git push origin --tags
 
``` 


* Double check _github_ for if tag was reallly and you are done!


### If something goes wrong

If you need revert your release after you run above command:

* Revert or shelve changed files 
* Make sure you also clean up created tag. 

To list tags:
```
  git tag -n

```

To delete newly created tag:

```
  git tag -d <TAG NAME>

```

* You should be good to go


   
 ## How to publish new version to NPM
 
 If you need to publish new version to the npm repo you need to run `./scripts/npmPublish.sh` and also understand what it does. You might 
 notice that our `package.json` under `/rules` has a `"VERSION_PLACEHOLDER"` as a version. We are not hardcoding version within its source 
 `package.json` rather we are using the same method angular does which is:
 * Build binaries into `./dist` folder
 * Read version from just released main `package.json`  
 * Replace all found occurrences of  `"VERSION_PLACEHOLDER"` with actual version number.
    * This makes things easier once we will add more libraries so we dont have to maintain several `package.json` files 


#### Steps


###### Read First
`
Make sure you have your account in the npmjs.com and you are added into this project and you run npm adduser  `

* Run following command

  ```
    `./scripts/npmPublish.sh`
  
  ```

* Done!

## How to work with schematics

If you need to update schematics and the same time you need to test it the easiest way is run these two steps

* Build it
```
  ./scripts/ci/build.sh link
```

*  Npm link it

    * You want to create new ng project using `ng new myTestApp --style=scss` and once the setup finishes cd into created
    project and run following command:
    
```
  npm link <ngx-meta project home>/dist/libs/rules
  
``` 

It will create a symlink and every time you do a change and run `./scripts/ci/build.sh link` again you will see it in your
new project.

Then while you are in the directory of `myTestApp` project you can execute schematics command like this:

```
  schematics @ngx-metaui/rules:<schematics name>
```

e.g.: When testing the `ng-add` functionality I always run: 

```
  schematics @ngx-metaui/rules:ng-add --skipDependencies
```

not to install npm packages on every run.


