import { WebpImagePipe } from './webp-image.pipe';
import { WebpAccess } from '../service/webp-access';
import { Observable, of, throwError } from 'rxjs';

describe('WebpImagePipe', () => {

  describe('given the pipe is called with a URL', () => {

    describe('when the polyfill is successfully applied', () => {

      it('returns a decoded value', () => {
        // Arrange
        const expectedValue = 'value';
        const serviceStub: WebpAccess = {
          decode(): Observable<string> {
            return of(expectedValue);
          },
        };
        const decodeSpy = spyOn(serviceStub, 'decode').and.callThrough();
        const pipe = new WebpImagePipe(serviceStub);

        // Act
        pipe.transform('anything')
          .subscribe((actualValue: string) => {

            // Assert
            expect(decodeSpy).toHaveBeenCalledWith('anything');
            expect(actualValue).toBe(expectedValue);
          });
      });
    });

    describe('when the polyfill is unsuccessfully applied', () => {

      it('returns the original URL', () => {
        // Arrange
        const expectedValue = 'value';
        const expectedError = new Error('Could not decode URL!');
        const serviceStub: WebpAccess = {
          decode(): Observable<string> {
            return throwError(expectedValue);
          },
        };
        const pipe = new WebpImagePipe(serviceStub);

        // Act
        pipe.transform(expectedValue)
          .subscribe((actualValue: string) => {

            // Assert
            expect(actualValue).toBe(expectedValue);
          });
      });
    });
  });
});
