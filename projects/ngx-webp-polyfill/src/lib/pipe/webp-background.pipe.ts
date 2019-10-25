import { Inject, Pipe, PipeTransform } from '@angular/core';
import { WEBP_POLYFILL, WebpAccess } from '../service/webp-access';
import { Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Pipe({
  name: 'webpBackground'
})
export class WebpBackgroundPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer,
              @Inject(WEBP_POLYFILL) private webpPolyFill: WebpAccess) {
  }

  transform(value: string, ...args: any[]): Observable<SafeStyle> {
    const imageUrl = value
      .slice(4, -1)
      .replace(/"/g, '');

    return this.webpPolyFill.decode(imageUrl)
      .pipe(
        map((dataString: string) => this.sanitizer.bypassSecurityTrustStyle(`url(${dataString})`)),
        catchError((err) => {
          console.error('Error applying pipe webpBackground', err);
          return of(value).pipe(take(1));
        })
      );
  }
}
