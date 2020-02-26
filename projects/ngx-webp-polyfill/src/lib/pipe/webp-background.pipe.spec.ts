import { Observable, of, throwError } from 'rxjs';
import { SecurityContext } from '@angular/core';
import { inject } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';

import { WebpBackgroundPipe } from './webp-background.pipe';
import { WebpAccess } from '../service/webp-access';

describe('WebpBackgroundPipe', () => {

  describe('given the pipe is called with a URL', () => {

    describe('when the polyfill is successfully applied', () => {

      it('returns a decoded value', inject([DomSanitizer], (sanitizer: DomSanitizer) => {
        // Arrange
        const expectedDecodedUrl = 'value';
        const expectedValue = `url(${expectedDecodedUrl})`;
        const expectedServiceCallValue = 'anything';
        const serviceStub: WebpAccess = {
          decode(): Observable<string> {
            return of(expectedDecodedUrl);
          },
        };
        const decodeSpy = spyOn(serviceStub, 'decode').and.callThrough();
        const pipe = new WebpBackgroundPipe(sanitizer, serviceStub);

        // Act
        pipe.transform(`url(${expectedServiceCallValue})`)
          .subscribe((actualValue: string) => {

            // Assert
            expect(decodeSpy).toHaveBeenCalledWith(expectedServiceCallValue);
            expect(sanitizer.sanitize(SecurityContext.STYLE, actualValue)).toBe(expectedValue);
          });
      }));
    });

    describe('when the polyfill is unsuccessfully applied', () => {

      it('returns a decoded value', inject([DomSanitizer], (sanitizer: DomSanitizer) => {
        // Arrange
        const expectedValue = 'url(value)';
        const expectedError = new Error('Could not decode URL!');
        const serviceStub: WebpAccess = {
          decode(): Observable<string> {
            return throwError(expectedError);
          },
        };
        const pipe = new WebpBackgroundPipe(sanitizer, serviceStub);

        // Act
        pipe.transform(expectedValue)
          .subscribe((actualValue: string) => {

            // Assert
            expect(actualValue).toBe(expectedValue);
          });
      }));
    });
  });
});
