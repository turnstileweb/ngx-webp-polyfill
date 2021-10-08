import { ModuleWithProviders, NgModule, Inject } from '@angular/core';
import { WebpImageDirective } from './directive/webp-image.directive';
import { WebpBackgroundDirective } from './directive/webp-background.directive';
import {
  DEFAULT_WEBP_OPTIONS, WEBP_POLYFILL, WEBP_POLYFILL_EXTERNAL,
  WEBP_POLYFILL_OPTIONS, WebpAccess,
  WebpExternalAccess,
  WebpPolyfillOptions,
} from './service/webp-access';
import { WebpMachineService } from './service/webp-machine.service';
import { WebpMachine } from 'webp-hero';
import { WebpImagePipe } from './pipe/webp-image.pipe';
import { WebpBackgroundPipe } from './pipe/webp-background.pipe';
import { Webp } from 'webp-hero/libwebp/dist/webp';

export function polyfillServiceFactory(options: WebpPolyfillOptions, externalWebp: WebpExternalAccess): WebpAccess {
  const webpMachineService = new WebpMachineService(options, externalWebp);
  webpMachineService.init();
  return webpMachineService;
}

export function externalPolyfillFactory(): WebpMachine {
  const webp = new Webp();
  return new WebpMachine({webp});
}

@NgModule({
  declarations: [
    WebpImageDirective,
    WebpBackgroundDirective,
    WebpImagePipe,
    WebpBackgroundPipe
  ],
  imports: [
  ],
  exports: [
    WebpBackgroundDirective,
    WebpImageDirective,
    WebpImagePipe,
    WebpBackgroundPipe
  ]
})
export class NgxWebpPolyfillModule {

  static forRoot(options?: WebpPolyfillOptions): ModuleWithProviders<NgxWebpPolyfillModule> {
    return {
      ngModule: NgxWebpPolyfillModule,
      providers: [
        {
          provide: WEBP_POLYFILL_OPTIONS,
          useValue: options ? options : DEFAULT_WEBP_OPTIONS
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
  }

  static forChild(): ModuleWithProviders<NgxWebpPolyfillModule> {
    return {
      ngModule: NgxWebpPolyfillModule
    };
  }
}
