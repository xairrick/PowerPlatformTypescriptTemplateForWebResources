# Overview
This is a template for transpiling typescript into javascript that will be unsed in Model Driven Apps on the Power Platform.
### Benefits
* Type checking when writing code (no more typos)
* Intellisense when writing code (includes Xrm intellisense and the code you write)
* Automatic namespaces (using the publisher prefix & filename)
* Code bundling to allow code re-use  
* Code bundling to reduces the number webresources that need to be included on a form to 1
* es-linting specific to the PowerPlatform
### How it works
1. You create **TyepScript** (*.ts) files in the `src\code` folder.   
1. npm is then used execute webpack
1. Webpack will transpile the **TypeScript**, bundle the code into one javascript file, place that file in  the `abc_\scripts`.
# Requirements
* node & npm  (https://nodejs.org/en/download/)
* VS Code (recommended) (https://code.visualstudio.com/)
  * ESLint extension (https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
# How to Build
1. 'abc' is just placeholder text for your publisher prefix, do a find and replace to set it to the value you will be using 
1. `npm install`
1. `npm run build`  
To auto build on save use `npm run start`  
To build the production version use `npm run dist`
### Building from Visual Studio Code
`<ctrl><shift>b` - This automatically runs the `npm install`  and `npm run build` commands.

`<alt>t` then `r` - to see all build tasks
### Building from Visual Studio 2022
The .esproj file can be opened by VS2022 (17.5).  Visual Studio will execute `npm install` & `npm run build` when building.

### Building with MSBUILD or dotnet
`msbuild` & `dotnet build` will also execute `npm install` & `npm run build`.

# Adding a new javascript file
1. Create the file in `src/code` folder as typescript file (.ts).  
The filename (minus extension) will also be the module name (aka namespace).   So if you add `account.ts`,  you get a file named `abc_/scripts/account.js` that has a namespace of `abc.account.*`  
**NOTE:** the casing on the filename is important, as it will carry over to the namespace (eg `workOrder.ts` will have the namespace `abc.workOrder`)
1. `npm run build` 
# Using the javascript WebResource in a Model Driven form
- [ ] TODO
# Using Fiddler to test 
In the AutoResponder tab
1. Check Enable rules
1. Check Unmatched requests passthrough
1. Rule Editor
    1. ``` REGEX:.+/abc_\/(scripts|assets)/(.*)```
    1. ``` c:\workspace\projects\ABC\System\Development\Source\WebResources\abc_\$1\$2 ```  
    (update the folder location to match your system)


# CI/CD (DevOps) Pipelines 
You can/should transplie the typescript in your CI/CD pipeline (and don't checkin the ```abc_``` folder).  

Sample of what I use in DevOps pipelines
```
parameters:
  - name: WebResourcesDir
    displayName: WebResourcesDir
    type: string
    default: Source/WebResources


- task: NodeTool@0
  displayName: Install Node JS tools
  inputs:
    versionSpec: '20.x'
- script: npm install
  workingDirectory: ${{ parameters.WebResourcesDir }}
  displayName: "WebResources Restore"
## Fail the build if there are any ESLint errors
#- script: npx eslint ./src/code/**
#  workingDirectory: ${{ parameters.WebResourcesDir }}
#  displayName: "WebResources ESLint"
- script: npm run dist
  workingDirectory: ${{ parameters.WebResourcesDir }}
  displayName: "WebResources Build"
```
The transpiled javascript should then be mapped into you solution file  [see more info](https://docs.microsoft.com/en-us/power-platform/alm/solution-packager-tool#use-the-map-command-argument)
