import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { FilmCarouselComponent } from './film/film-carousel/film-carousel.component';
import { FilmSliderComponent } from './film/film-slider/film-slider.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
// import { CommentAreaComponent } from './comments/comment-area/comment-area.component';
// import { CommentComponent } from './comments/comment/comment.component';
// import { NewCommentComponent } from './comments/new-comment/new-comment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminPagesComponent } from './admin-pages/admin-pages.component';
import { FilmsComponent } from './admin-pages/films/films.component';
import { MenuComponent } from './admin-pages/menu/menu.component';
import { UserCardComponent } from './auth/user-card/user-card.component';
import { AuthInterceptor } from "./auth/auth.interceptor";
// import { HelpCardComponent } from './admin-pages/help-card/help-card.component';
import { FilmComponent } from './film/film/film.component';
import { FilmCardComponent } from './film/film-card/film-card.component';
import { FilmListComponent } from './film/film-list/film-list.component';
import { ChooseSeatsComponent } from './reservation/choose-seats/choose-seats.component';
import { CommentAreaComponent } from './comments/comment-area/comment-area.component';
import { CommentComponent } from './comments/comment/comment.component';
import { NewCommentComponent } from './comments/new-comment/new-comment.component';
import { BasketComponent } from './basket/basket.component';
// import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    FilmCarouselComponent,
    FilmSliderComponent,
    HomePageComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    // CommentAreaComponent,
    // CommentComponent,
    // NewCommentComponent,
    FilmListComponent,
    AdminPagesComponent,
    FilmsComponent,
    MenuComponent,
    UserCardComponent,
    // HelpCardComponent,
    FilmComponent,
    FilmCardComponent,
    ChooseSeatsComponent,
    BasketComponent,
    CommentAreaComponent,
    CommentComponent,
    NewCommentComponent,
    // SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
