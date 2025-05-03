import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Image, ImageMetaData } from './image';

@Injectable({
  providedIn: 'root',
})
export class PicsumService {
  constructor(private httpClient: HttpClient) {}

  thumbnails(): Observable<Image[]> {
    return this.httpClient.get<ImageMetaData[]>('https://picsum.photos/v2/list?page=4&limit=8').pipe(
      map(
        (response: ImageMetaData[]): Image[] => {
          return response.map(
            (image: ImageMetaData): Image => {
              return new Image({
                ...image,
                thumbnail_url: `https://picsum.photos/id/${image.id}/367/267.webp`,
              });
            },
          );
        },
      ),
    );
  }
}
