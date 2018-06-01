/**
 *
 * @original-license
 *
 * The MIT License
 *
 * MIT-style license that can be found in the LICENSE file at https://angular.io/license
 *
 *
 * Credit: Tooling derived and extend from https://github.com/angular/material2
 *
 */
const SemVer = require('semver');


export interface NpmRepository {
    type: string
    url: string
}

export interface NpmBugs {
    url: string
}

export interface PackageDescriptor {
    filePath?: string
    name: string
    version: string
    keywords: string[]
    license: string
    homepage: string
    description: string
    main: string
    typings: string
    bugs?: NpmBugs
    repository?: NpmRepository
    dependencies?: {[key: string]: string }
    devDependencies?: {[key: string]: string }
    peerDependencies: {[key: string]: string },
    scripts?: any
}


export class NpmPackageMaker
{

    private fullModuleDefinitions: {[key: string]: PackageDescriptor} = {}
    private globalDependencies: {[key: string]: string};
    private previousGlobalVersion: string
    private sharedDefinition: PackageDescriptor

    constructor(private globalPackageDefinition: PackageDescriptor,
                private moduleDefinitions: { [key: string]: PackageDescriptor},
                private bump: string,
              private qualifier: string) {
        this.previousGlobalVersion = this.globalPackageDefinition.version
        this.globalDependencies = this.joinMaps(
            this.globalPackageDefinition.dependencies || {},
            this.globalPackageDefinition.devDependencies || {},
            this.globalPackageDefinition.peerDependencies || {}
        )
        this.sharedDefinition = Object.assign({}, this.globalPackageDefinition, {
            dependencies: {},
            devDependencies: {},
            peerDependencies: {}
        });
        delete this.sharedDefinition.scripts
    }

  updatedRootModule():PackageDescriptor{
        return Object.assign({}, this.globalPackageDefinition, {
            version: this.sharedDefinition.version
        })
    }

  updateModules(): {[key: string]: PackageDescriptor} {
    this.sharedDefinition.version = SemVer.inc(this.sharedDefinition.version, this.bump, this.qualifier)
    Object.keys(this.moduleDefinitions).forEach((key: string) => {
            this.fullModuleDefinitions[key] = this.getFullDefinition(this.moduleDefinitions[key])
        })
    Object.keys(this.fullModuleDefinitions).forEach((key: string) => {
            let module = this.fullModuleDefinitions[key]
            module.peerDependencies = this.getUpdatedPeerDependencies(module);
        })
        return this.fullModuleDefinitions
    }


  private getFullDefinition(module: PackageDescriptor): PackageDescriptor {
    let newVersion = SemVer.inc(module.version || this.previousGlobalVersion, this.bump, this.qualifier)
        let fullDefinition = Object.assign({}, this.sharedDefinition, module, {
            version: newVersion
        })
        let keywords = module.keywords.concat(this.sharedDefinition.keywords)
        let map = {} // remove duplicates
    keywords.forEach((item)=>{
            map[item] = true
        })
        keywords = Object.keys(map)
        fullDefinition.keywords = keywords
        return fullDefinition
    }

  private getUpdatedPeerDependencies(module: PackageDescriptor): {[key: string]: string} {
        let peers: {[key: string]: string} = {}
        let x = this.fullModuleDefinitions
    Object.keys(module.peerDependencies).forEach((key: string) => {

            let peerVersion = this.globalDependencies[key]
            if (!peerVersion && x[key]) {
                peerVersion = x[key].version
            }
            if (!peerVersion) {
                if (x[key]) {
                    console.log('NpmPackageMaker', "now that's fucked", x[key].version)
                }
                throw new Error(`Dependency for '${key}' not defined in the global project: cannot determine which version to use for module '${module.name} `)
            }
            peers[key] = peerVersion
        })
        return peers;
    }


  joinMaps(dependencies: {[key: string]: string}, devDependencies: {[key: string]: string}, peerDependencies: {[key: string]: string}): {[key: string]: string} {
        // Could use varArgs version of assign, but then we couldn't error check
        let output: {[key: string]: string} = Object.assign({}, dependencies)
        let errors: string[] = [];


    Object.keys(devDependencies).forEach((key: string) => {
            if (output[key]) {
        errors.push(`Collision while joining maps: '${key}' defined in both 'dependencies' and 'devDependencies'.`)
            }
            output[key] = devDependencies[key]
        })
    Object.keys(peerDependencies).forEach((key: string) => {
            if (output[key]) {
                let abused = devDependencies[key] ? 'devDependencies' : 'dependencies'
        errors.push(`Collision while joining maps: '${key}' defined in both '${abused}' and 'peerDependencies'.`)
            }
            output[key] = devDependencies[key]
        })

        if (errors.length) {
            throw new Error(errors.join("\n"))
        }

        return output
    }
}
