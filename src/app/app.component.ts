import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject, EMPTY, Observable, Subject } from 'rxjs';
import { catchError, debounceTime, tap } from 'rxjs/operators';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { PicsumService } from './service/picsum.service';
import { Image } from './service/image';
import { HttpClientModule } from '@angular/common/http';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { WebpBackgroundPipe, WebpImagePipe } from 'ngx-webp-polyfill';
export enum ElementStrategy {
  IMAGE_PIPE = 'image-pipe',
  BACKGROUND_PIPE = 'background-pipe'
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatRadioModule, HttpClientModule, NgFor, NgIf, AsyncPipe, WebpBackgroundPipe, WebpImagePipe],
  providers: [PicsumService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  thumbnails = new Subject<Array<Image>>();

  private error = new BehaviorSubject<string | undefined>(undefined);
  get errorDetail(): Observable<string | undefined> {
    return this.error.asObservable();
  }

  ElementStrategy = ElementStrategy;

  private elementStrategy = new BehaviorSubject<ElementStrategy>(ElementStrategy.IMAGE_PIPE);

  get elementType(): Observable<ElementStrategy> {
    return this.elementStrategy.asObservable();
  }

  constructor(private imageApi: PicsumService) {}

  ngOnInit(): void {
    this.fetchThumbnails();
  }

  changeElementStrategy(change: MatRadioChange): void {
    this.elementStrategy.next(change.value);
  }

  fetchThumbnails(): void {
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
