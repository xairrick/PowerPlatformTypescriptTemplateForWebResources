# Overview
This is a template for transpiling typescript into javascript that will be unsed in Model Driven Apps on the Power Platform.
### Benefits
* Type checking when writing code (no more typos)
* Intellisense when writing code (includes Xrm intellisense and the code you write)
* Automatic namespaces (using the publisher prefix & filename)
* Code bundling to allow code re-use  
* Code bundling to reduces the number webresources that need to be included on a form to 1
* (FUTURE) es-linting specific to the PowerPlatform
### How it works
1. You create **TyepScript** (*.ts) files in the `src\code` folder.   
1. npm is then used execute webpack
1. Webpack will transpile the **TypeScript**, bundle the code into one javascript file, place that file in  the `abc_\scripts`.
# Requirements
* node & npm  (https://nodejs.org/en/download/)
* typescript  (`npm install -g typescript`)
* VS Code (recommended) (https://code.visualstudio.com/)
# How to Build
1. 'abc' is just placeholder text for your publisher prefix, do a find and replace to set it to the value you will be using 
1. `npm install`
1. `npm run build`  
To auto build on save use `npm run start`  
To build the production version use `npm run dist`
# Adding a new javascript file
1. Create the file in `src/code` folder as typescript file (.ts).  
The filename (minus extension) will also be the module name (aka namespace).   So if you add `account.ts`,  you get a file named `abc_\scripts\account.js` that has a namespace of `abc.account.*`  
**NOTE:** the casing on the filename is important, as it will carry over to the namespace (eg `workOrder.ts` will have the namespace `abc.workOrder`)
1. `npm run build` 
# Using the javascript WebResource in a Model Driven form
[] TODO
# Using Fiddler to test 
In the AutoResponder tab
1. Check Enable rules
1. Check Unmatched requests passthrough
1. Rule Editor
    1. ``` REGEX:.+/abc_\/scripts/(.*) ```
    1. ``` c:\workspace\projects\ABC\System\Development\Source\WebResources\abc_\scripts\$1 ```  
    (update thes folder location to match your system)


# CI/CD (DevOps) Pipelines 
You can/should transplie the typescript in your CI/CD pipeline (and don't checkin the ```abc_``` folder).  

Sample of what I use in DevOps pipelines
```
  - task: JoeJulik.install-node-and-npm-task.custom-build-release-task.NodeAndNpmTool@1
    displayName: "Install Node & NPM"
  - script: npm install -g typescript
    displayName: "Install Typescript"
  - script: npm install
    workingDirectory: System/Development/Source/WebResources
    displayName: "WebResources Restore"
  - script: npm run dist
    workingDirectory: System/Development/Source/WebResources
    displayName: "WebResources Build"
```
The transpiled javascript should then be mapped into you solution file  [see more info](https://docs.microsoft.com/en-us/power-platform/alm/solution-packager-tool#use-the-map-command-argument)
