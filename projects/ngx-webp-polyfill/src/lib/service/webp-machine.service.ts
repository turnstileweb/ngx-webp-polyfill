import { Inject, Injectable } from '@angular/core';
import {
  WEBP_POLYFILL_EXTERNAL,
  WEBP_POLYFILL_OPTIONS,
  WebpAccess,
  WebpExternalAccess,
  WebpPolyfillOptions
} from './webp-access';
import PQueue from 'p-queue';
import { Observable, of, ReplaySubject } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';

export class LoadingError extends Error {
}

@Injectable()
export class WebpMachineService implements WebpAccess {

  private hasWebpSupport = new ReplaySubject<boolean>();

  private processingQueue = new PQueue({ concurrency: 1 });

  constructor(@Inject(WEBP_POLYFILL_OPTIONS) private options: WebpPolyfillOptions,
              @Inject(WEBP_POLYFILL_EXTERNAL) private webpPolyFill: WebpExternalAccess) {
  }

  init(): void {
    this.detectWebpSupport()
      .then((isSupported: boolean) => this.hasWebpSupport.next(isSupported));
  }

  decode(url: string): Observable<string> {
    return this.hasWebpSupport.pipe(
      switchMap((hasBrowserSupport: boolean) => {
        if (hasBrowserSupport && this.options.applyPolyfill(url)) {
          return fromPromise(this.processingQueue.add(() => {
            return this.loadBinaryData(url)
              .then((data: Uint8Array) => this.webpPolyFill.decode(data));
          }));
        }
        return of(url);
      }),
      take(1)
    );
  }

  private detectWebpSupport(): Promise<boolean> {
    const testImageSources = [
      'data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==',
      'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAQAAAAfQ//73v/+BiOh/AAA='
    ];

    const testImage = (src: string): Promise<boolean> => {
      return new Promise((resolve) => {
        const img = document.createElement('img');
        img.onerror = () => resolve(false);
        img.onload = () => resolve(true);
        img.src = src;
      });
    };

    return Promise.all(testImageSources.map(testImage))
      .then((resultsOfTest: boolean[]) => {
        return resultsOfTest.findIndex((resultOfTest: boolean) => !resultOfTest) < 0
      });
  }

  private loadBinaryData(url: string): Promise<Uint8Array> {
    return new Promise<Uint8Array>((resolve, reject) => {

      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = 'arraybuffer';

      const handleError = () => {
        reject(
          new LoadingError(`failed to load binary data, code "${xhr.status}" from "${url}"`)
        );
      };

      xhr.onerror = handleError;

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(new Uint8Array(xhr.response));
          } else {
            handleError();
          }
        }
      };

      xhr.send();
    })
  }
}
