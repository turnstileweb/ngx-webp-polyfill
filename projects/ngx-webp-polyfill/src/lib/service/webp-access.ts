import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { PolyfillDocumentOptions } from 'webp-hero';

export interface WebpAccess {
  /**
   * Decode the URL to a PNG data string
   */
  decode(url: string): Observable<string>;
}

export const WEBP_POLYFILL = new InjectionToken<WebpAccess>('WEBP_POLYFILL');

/**
 * applyPolyfill
 *  - option to configure when to apply polyfill
 *  - example: () => /msie\s|trident\/|edge\//i.test(window.navigator.userAgent)
 */
export interface WebpPolyfillOptions {
  applyPolyfill: (url: string) => boolean;
}

export const DEFAULT_WEBP_OPTIONS: WebpPolyfillOptions = {
  applyPolyfill: () => true
};

export const WEBP_POLYFILL_OPTIONS = new InjectionToken<WebpPolyfillOptions>('WEBP_POLYFILL_OPTIONS');

/**
 * @see webp-hero
 */
export interface WebpExternalAccess {
  decode(webpData: Uint8Array): Promise<string>;
  polyfillImage(image: HTMLImageElement): Promise<void>;
  polyfillDocument({ document }?: PolyfillDocumentOptions): Promise<void>;
}

export const WEBP_POLYFILL_EXTERNAL = new InjectionToken<WebpExternalAccess>('WEBP_POLYFILL_EXTERNAL');


