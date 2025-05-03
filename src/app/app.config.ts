import { ApplicationConfig, Inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { externalPolyfillFactory, DEFAULT_WEBP_OPTIONS, polyfillServiceFactory, WEBP_POLYFILL, WEBP_POLYFILL_EXTERNAL, WEBP_POLYFILL_OPTIONS } from 'ngx-webp-polyfill';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
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

