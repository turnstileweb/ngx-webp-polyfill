# Angular Webp Polyfill

A Webp polyfill for Angular, using `webp-hero`. This module applies to polyfill as Angular Directives for:
1. Image elements
2. Elements with a `background-image` style

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

Import `NgxWebpPolyfillModule.forRoot()` into `AppModule`.

```
import { NgxWebpPolyfillModule } from 'ngx-webp-polyfill';

@NgModule({
  imports: [
    NgxWebpPolyfillModule.forRoot()
  ]
})
export class AppModule { }

```

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

Apply the polyfill directives in your template.
```
  <img [appWebpImage]="myImageUrl" class="photo" [src]="myImageUrl" alt="My Image"/>

  <div [appWebpBackground]="myImageUrl" style="width: 200px; height: 200px"></div>

```

## Contributing

Fork and send us a pull request. Consider discussing the change with us before committing the code. The library follows semantic versioning principles, which is automated using conventional commit messages. 

To use the interactive CLI when committing:

```
    $ git add <file/s to commit>
    $ yarn commit
```

Or use your IDE, commits messages are linted!

## Release
These instructions are for maintainers of this library, to release a new version:
1. Generate new version and tag with `yarn release && git push --follow-tags master`
2. Builds and package the library `yarn package:library`
3. Publish the library to NPM `cd dist/ngx-webp-polyfill && npm publish`
