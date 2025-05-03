import { Inject, Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

import { WEBP_POLYFILL, WebpAccess } from '../service/webp-access';

@Pipe({
  name: 'webpImage',
  standalone: true
})
export class WebpImagePipe implements PipeTransform {

  constructor(@Inject(WEBP_POLYFILL) private webpPolyFill: WebpAccess) {
  }

  transform(value: string, ...args: any[]): Observable<string> {
    return this.webpPolyFill.decode(value)
      .pipe(
        catchError((err) => {
          console.error('Error applying pipe webpImage', err);
          return of(value).pipe(take(1));
        })
      );
  }
}
