import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, Subject } from 'rxjs';
import { catchError, debounceTime, tap } from 'rxjs/operators';
import { MatRadioChange } from '@angular/material/radio';
import { PicsumService } from './service/picsum.service';
import { Image } from './service/image';

export enum ElementStrategy {
  IMAGE_DIRECTIVE = 'image-directive',
  IMAGE_PIPE = 'image-pipe',
  BACKGROUND_DIRECTIVE = 'background-directive',
  BACKGROUND_PIPE = 'background-pipe',
}

@Component({
  selector: 'tw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  thumbnails = new Subject<Array<Image>>();

  private error = new BehaviorSubject<string | undefined>(undefined);
  get errorDetail(): Observable<string | undefined> {
    return this.error.asObservable();
  }

  ElementStrategy = ElementStrategy;

  private elementStrategy = new BehaviorSubject<ElementStrategy>(ElementStrategy.IMAGE_DIRECTIVE);

  get elementType(): Observable<ElementStrategy> {
    return this.elementStrategy.asObservable();
  }

  constructor(private imageApi: PicsumService) {}

  ngOnInit(): void {
    this.fetchThumbnails();
  }

  changeElementStrategy(change: MatRadioChange) {
    this.elementStrategy.next(change.value);
  }

  fetchThumbnails() {
    this.imageApi
      .thumbnails()
      .pipe(
        debounceTime(500),
        tap((response: Array<Image>) => {
          this.thumbnails.next(response);
          this.error.next(undefined);
        }),
        catchError((err: any) => {
          console.log(err.message);
          this.error.next(err.message);
          return EMPTY;
        }),
      )
      .subscribe();
  }
}
