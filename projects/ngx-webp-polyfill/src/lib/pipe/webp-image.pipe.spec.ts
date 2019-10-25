import { WebpImagePipe } from './webp-image.pipe';
import { WebpAccess } from '../service/webp-access';
import { Observable, of } from 'rxjs';

describe('WebpImagePipe', () => {

  it('returns a decoded', () => {
    // Arrange
    const expectedValue = 'value';
    const serviceStub: WebpAccess = {
      decode(): Observable<string> {
        return of(expectedValue);
      }
    };
    const decodeSpy = spyOn(serviceStub, 'decode').and.callThrough();
    const pipe = new WebpImagePipe(serviceStub);

    // Act
    pipe.transform('anything')
      .subscribe((actualValue: string) => {

        // Assert
        expect(decodeSpy).toHaveBeenCalledWith('anything');
        expect(actualValue).toBe(expectedValue);
      })
  });
});
