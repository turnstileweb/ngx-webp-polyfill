import { ModuleWithProviders, NgModule, Inject } from '@angular/core';
import { WebpImageDirective } from './directive/webp-image.directive';
import { WebpBackgroundDirective } from './directive/webp-background.directive';
import {
  DEFAULT_WEBP_OPTIONS, WEBP_POLYFILL, WEBP_POLYFILL_EXTERNAL,
  WEBP_POLYFILL_OPTIONS,
  WebpExternalAccess,
  WebpPolyfillOptions
} from './service/webp-access';
import { WebpMachineService } from './service/webp-machine.service';
import { WebpMachine } from 'webp-hero';

export function polyfillServiceFactory(options: WebpPolyfillOptions, externalWebp: WebpExternalAccess) {
  const webpMachineService = new WebpMachineService(options, externalWebp);
  webpMachineService.init();
  return webpMachineService;
}

export function externalPolyfillFactory() {
  return new WebpMachine();
}

@NgModule({
  declarations: [
    WebpImageDirective,
    WebpBackgroundDirective
  ],
  imports: [
  ],
  exports: [
    WebpBackgroundDirective,
    WebpImageDirective
  ]
})
export class NgxWebpPolyfillModule {

  static forRoot(options?: WebpPolyfillOptions): ModuleWithProviders {
    return {
      ngModule: NgxWebpPolyfillModule,
      providers: [
        {
          provide: WEBP_POLYFILL_OPTIONS,
          useValue: options ? options: DEFAULT_WEBP_OPTIONS
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

  static forChild(): ModuleWithProviders {
    return {
      ngModule: NgxWebpPolyfillModule
    };
  }
}
