import { Observable, of } from 'rxjs';
import { SecurityContext } from '@angular/core';
import { inject } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';

import { WebpBackgroundPipe } from './webp-background.pipe';
import { WebpAccess } from '../service/webp-access';

describe('WebpBackgroundPipe', () => {

  it('returns a decoded value', inject([DomSanitizer], (sanitizer: DomSanitizer) => {
    // Arrange
    const expectedDecodedUrl = 'value';
    const expectedValue = `url(${expectedDecodedUrl})`;
    const expectedServiceCallValue = 'anything';
    const serviceStub: WebpAccess = {
      decode(): Observable<string> {
        return of(expectedDecodedUrl);
      }
    };
    const decodeSpy = spyOn(serviceStub, 'decode').and.callThrough();
    const pipe = new WebpBackgroundPipe(sanitizer, serviceStub);

    // Act
    pipe.transform(`url(${expectedServiceCallValue})`)
      .subscribe((actualValue: string) => {

        // Assert
        expect(decodeSpy).toHaveBeenCalledWith(expectedServiceCallValue);
        expect(sanitizer.sanitize(SecurityContext.STYLE, actualValue)).toBe(expectedValue);
      })
  }));
});
