import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilmCarouselComponent } from './film-carousel/film-carousel.component';
import { FilmSliderComponent } from './film-slider/film-slider.component';

@NgModule({
  declarations: [
    AppComponent,
    FilmCarouselComponent,
    FilmSliderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
