import {
  AfterViewInit, ChangeDetectorRef,
  Directive,
  ElementRef,
  Inject, Input, Renderer2,
} from '@angular/core';
import { WEBP_POLYFILL, WebpAccess } from '../service/webp-access';
import { catchError, take, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Directive({
  selector: '[twWebpBackground]'
})
export class WebpBackgroundDirective implements AfterViewInit {

  private webpBackground: string;

  @Input()
  set twWebpBackground(imageUrl: string) {
    this.webpBackground = imageUrl;
  }

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2,
              private changeDetectorRef: ChangeDetectorRef,
              @Inject(WEBP_POLYFILL) private webpPolyFill: WebpAccess) {
  }

  ngAfterViewInit(): void {
    this.webpPolyFill.decode(this.webpBackground)
      .pipe(
        tap((dataString: string) => {
          this.renderer.setStyle(this.elementRef.nativeElement, 'background-image', `url(${dataString})`);
          this.changeDetectorRef.detectChanges();
        }),
        catchError((err: any) => {
          console.error(err);
          return of(`url(${this.webpBackground}`)
            .pipe(take(1));
        })
      )
      .subscribe();
  }
}
