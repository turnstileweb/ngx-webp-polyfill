# Angular Webp Polyfill

A Webp polyfill for Angular, using `webp-hero`. This module applies to polyfill as Angular Pipes/Directives for:
1. Image elements
2. Elements with a `background-image` style

You can view a demo [here](http://webp.turnstileweb.com.au/).

## Installation
NPM
```
npm install --save ngx-webp-polyfill webp-hero p-queue
```

Yarn
```
yarn add ngx-webp-polyfill webp-hero p-queue
```

To allow the polyfill to be applied to images one-at-a-time (as enforced by `webp-hero`) we use `p-queue` to queue the decoding.  

## Usage

### Standalone
Configure the default and/or override providers in your `ApplicationConfig`.

```
import { ApplicationConfig, Inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { externalPolyfillFactory, DEFAULT_WEBP_OPTIONS, polyfillServiceFactory, WEBP_POLYFILL, WEBP_POLYFILL_EXTERNAL, WEBP_POLYFILL_OPTIONS } from 'ngx-webp-polyfill';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: WEBP_POLYFILL_OPTIONS,
      useValue: DEFAULT_WEBP_OPTIONS
    },
    {
      provide: WEBP_POLYFILL,
      useFactory: polyfillServiceFactory,
      deps: [ [new Inject(WEBP_POLYFILL_OPTIONS)], [new Inject(WEBP_POLYFILL_EXTERNAL)]]
    },
    {
      provide: WEBP_POLYFILL_EXTERNAL,
      useFactory: externalPolyfillFactory
    }
  ]
};
```

### NgxWebpPolyfillModule.forRoot(options?: WebpPolyfillOptions)
Import `NgxWebpPolyfillModule.forRoot(options?: WebpPolyfillOptions)` into `AppModule`.

`WebpPolyfillOptions`
- `applyPolyfill: (url: string) => boolean` (defaults to true) to apply the polyfill conditionally i.e. for specific browsers
```
import { NgxWebpPolyfillModule } from 'ngx-webp-polyfill';

export function webpPolyfillOptions(url: string) {
  return true;
}

@NgModule({
  imports: [
    NgxWebpPolyfillModule.forRoot({
        applyPolyfill: webpPolyfillOptions
    })
  ]
})
export class AppModule { }
```

### NgxWebpPolyfillModule.forChild()

Import `NgxWebpPolyfillModule.forChild()` into your application child modules, where needed.

```
import { NgxWebpPolyfillModule } from 'ngx-webp-polyfill';

@NgModule({
  imports: [
    NgxWebpPolyfillModule.forChild()
  ]
})
export class MyFeatureModule { }
```

### Template example
Apply the polyfill directives in your template with the following options.

##### webpImage Pipe
```
  <img *ngIf="myImageUrl | webpImage | async as imagePipeTransform"
       [src]="imagePipeTransform"
       alt="My Image"
       class="thumbnail"/>
```
Note: The use of `*ngIf` is required here as the `async` pipe will emit `null` as an initial value.

##### webpBackground Pipe
```
  <div [style.background-image]="'url(' + myImageUrl + ')' | webpBackground | async"
       style="width: 200px; height: 200px"></div>
```

## Contributing

Fork and send us a pull request. Consider discussing the change with us before committing the code. The library follows semantic versioning principles, which is automated using conventional commit messages. 

## Development

### Running the demo and library locally using `npm link`
1. `npm run build:library` to watch changes
2. `cd dist/ngx-webp-polyfill && npm link && cd ../../ && npm link ngx-webp-polyfill` allows the demo application to develop against the locally built library
3. `npm start` to start the demo application

### Clean up
1. `cd dist/ngx-webp-polyfill && npm unlink && cd ../../ && npm unlink ngx-webp-polyfill` reverts `npm link`

## Committing
To use the interactive CLI when committing:

```
    $ git add <file/s to commit>
    $ npm run commit
```

Or use your IDE, commits messages are linted!

## Release
These instructions are for maintainers of this library, to release a new version:
### Package
1. Generate new version and tag with `npm run release && git push --follow-tags origin master`
2. Builds and package the library `npm run package:library`
3. Publish the library to NPM `cd dist/ngx-webp-polyfill && npm publish`

### Demo
1. To build the demo run `npm run build`
