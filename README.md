# SekolikoFront

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Initialise Development Environment

Clone the repository
```bash
git clone https://github.com/nyandrianinamamy/sekoliko_front.git
```

Install the dependencies
```bash
npm install
```
## Creating Features

To create a feature module containing components, routes, services,
types and isolated ngrx infrastructure, you must specify the feature's
`name`, `path` and optionally, you can specify your project's component
`prefix` for its selector, but the schematic can often figure this out
from your Angular project workspace.

```bash
schematics @egervari/schematics-angular:feature --name=my-feature --path=src/app
```

If your project currently does not have a `/features` folder, the
schematic will create one for you.

## Creating Modules

Sometimes you wish to create modules outside of your routes. They are
not really features, but reusable pieces of code the rest of the app
can share. To create such a module, run the following schematic:

```bash
schematics @egervari/schematics-angular:module --name=my-module --path=src/app
```

If your project currently does not have a `/modules` folder, the
schematic will create one for you.

## Creating Components

Creating components is equally easy - make sure to point the `path`
to the module/feature folder you wish the component to be located:

```bash
schematics @egervari/schematics-angular:component --name=my-form --path=src/app
```

If your path currently does not have a `/components` folder, the
schematic will create one for you.

## Creating Services

Creates a service and updates the containing module file.

```bash
schematics @egervari/schematics-angular:service --name=my-api --path=src/app
```

If your path currently does not have a `/services` folder, the
schematic will create one for you.

## Creating Types

Creates a paired interface and functions file for a given model.

```bash
schematics @egervari/schematics-angular:type --name=user-profile --path=src/app
```

If your path currently does not have a `/types` folder, the
schematic will create one for you.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
