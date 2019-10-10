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
