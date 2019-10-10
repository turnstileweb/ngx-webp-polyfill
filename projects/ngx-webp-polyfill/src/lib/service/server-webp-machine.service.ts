import { Injectable } from '@angular/core';
import { WebpAccess } from './webp-access';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class ServerWebpMachineService implements WebpAccess {

  constructor() { }

  decode(url: string): Observable<string> {
    return of(url)
      .pipe(take(1));
  }
}
