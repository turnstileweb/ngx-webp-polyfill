import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, Inject, Input, Renderer2 } from '@angular/core';
import { WEBP_POLYFILL, WebpAccess } from '../service/webp-access';
import { catchError, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Directive({
  selector: '[twWebpImage]'
})
export class WebpImageDirective implements AfterViewInit {

  private webpImage: string;

  @Input()
  set twWebpImage(imageUrl: string) {
    this.webpImage = imageUrl;
  }

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2,
              private changeDetectorRef: ChangeDetectorRef,
              @Inject(WEBP_POLYFILL) private webpPolyFill: WebpAccess) {
  }


  ngAfterViewInit(): void {
    this.webpPolyFill.decode(this.webpImage)
      .pipe(
        tap((dataString: string) => {
          this.renderer.setAttribute(this.elementRef.nativeElement, 'src', `${dataString}`);
          this.changeDetectorRef.detectChanges();
        }),
        catchError((err: any) => {
          console.error(err);
          return EMPTY;
        })
      )
      .subscribe();
  }
}
