import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatRadioModule } from '@angular/material/radio';
import { NgModule } from '@angular/core';

import { NgxWebpPolyfillModule } from 'ngx-webp-polyfill';
import { AppComponent } from './app.component';

export function webpPolyfillOptions(): boolean {
  return true;
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxWebpPolyfillModule.forRoot({
      applyPolyfill: webpPolyfillOptions,
    }),
    MatRadioModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
