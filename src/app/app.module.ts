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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminPagesComponent } from './admin-pages/admin-pages.component';
import { MenuComponent } from './admin-pages/menu/menu.component';
import { UserCardComponent } from './auth/user-card/user-card.component';
import { AuthInterceptor } from "./auth/auth.interceptor";
import { HelpCardComponent } from './admin-pages/help-card/help-card.component';
import { FilmComponent } from './film/film/film.component';
import { FilmCardComponent } from './film/film-card/film-card.component';
import { FilmListComponent } from './film/film-list/film-list.component';
import { ChooseSeatsComponent } from './reservation/choose-seats/choose-seats.component';
import { CommentAreaComponent } from './comments/comment-area/comment-area.component';
import { CommentComponent } from './comments/comment/comment.component';
import { NewCommentComponent } from './comments/new-comment/new-comment.component';
import { BasketComponent } from './basket/basket.component';
import { SearchComponent } from './search/search.component';
import { LastReportsComponent } from './admin-pages/reports/last-reports/last-reports.component';
import { ReportComponent } from './admin-pages/reports/report/report.component';
import { CommentsComponent } from './admin-pages/comments/comments.component';
import { DashboardComponent } from './admin-pages/dashboard/dashboard.component';
import { ReportsListComponent } from './admin-pages/reports/reports-list/reports-list.component';
import { PersonalityComponent } from './personality/personality.component';
import { PinedFilmsComponent } from './admin-pages/films/pined-films/pined-films.component';
import { SearchFilmComponent } from './film/search-film/search-film.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { EditProfileComponent } from './auth/edit-profile/edit-profile.component';
import { UsersListComponent } from './admin-pages/users/users-list/users-list.component';
import { UserFormComponent } from './admin-pages/users/user-form/user-form.component';
import { PersonalityFormComponent } from './admin-pages/personalities/personality-form/personality-form.component';
import { PersonalitiesListComponent } from './admin-pages/personalities/personalities-list/personalities-list.component';
import { FilmFormComponent } from './admin-pages/films/film-form/film-form.component';
import { GenreFormComponent } from './admin-pages/films/genre-form/genre-form.component';
import { FilmGenreListComponent } from './admin-pages/films/film-genre-list/film-genre-list.component';
import { ProgrammeListComponent } from './admin-pages/programmes/programme-list/programme-list.component';
import { ProgrammeFormComponent } from './admin-pages/programmes/programme-form/programme-form.component';
import { LangsListComponent } from './admin-pages/langs/langs-list/langs-list.component';
import { LangFormComponent } from './admin-pages/langs/lang-form/lang-form.component';
import { RoomsListComponent } from './admin-pages/rooms/rooms-list/rooms-list.component';
import { RoomFormComponent } from './admin-pages/rooms/room-form/room-form.component';
import { GenresSelectorComponent } from './admin-pages/films/genres-selector/genres-selector.component';
import { PersonalitiesSelectorComponent } from './admin-pages/personalities/personalities-selector/personalities-selector.component';
import { FilmSelectorComponent } from './admin-pages/films/film-selector/film-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    FilmCarouselComponent,
    FilmSliderComponent,
    HomePageComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    FilmListComponent,
    AdminPagesComponent,
    MenuComponent,
    UserCardComponent,
    HelpCardComponent,
    FilmComponent,
    FilmCardComponent,
    ChooseSeatsComponent,
    BasketComponent,
    CommentAreaComponent,
    CommentComponent,
    NewCommentComponent,
    SearchComponent,
    LastReportsComponent,
    ReportComponent,
    CommentsComponent,
    DashboardComponent,
    ReportsListComponent,
    PersonalityComponent,
    PinedFilmsComponent,
    SearchFilmComponent,
    ProfileComponent,
    EditProfileComponent,
    UsersListComponent,
    UserFormComponent,
    PersonalityFormComponent,
    PersonalitiesListComponent,
    FilmFormComponent,
    GenreFormComponent,
    FilmGenreListComponent,
    ProgrammeListComponent,
    ProgrammeFormComponent,
    LangsListComponent,
    LangFormComponent,
    RoomsListComponent,
    RoomFormComponent,
    GenresSelectorComponent,
    PersonalitiesSelectorComponent,
    FilmSelectorComponent,
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
