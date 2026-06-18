import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Film} from "../../models/film.model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {PinedFilm} from "../../models/pinedFilm.model";

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private BASE_URL = "http://localhost:8000/api/film/";

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Récupère le JSON d'un film unique de l'API grâce à son slug.
   * @param slug Slug du film à charger.
   */
  getFilmBySlug(slug: string): Observable<Film> {
    return this.http.get<any[]>(this.BASE_URL + slug).pipe(
      map((parseJson: any) => {
        if (Array.isArray(parseJson) && parseJson.length > 0) {
          return new Film(parseJson[0]);
        }
        return new Film(parseJson);
      })
    );
  }

  /**
   * Récuperation de tout les films en JSON.
   */
  getAllFilms(): Observable<Film[]> {
    return this.http.get<any[]>(this.BASE_URL).pipe(
      map((jsonArray: any[]) => {
        return jsonArray.map(filmJson => new Film(filmJson));
      })
    );
  }

  /**
   * Récuperation des films à l'affiche.
   */
  getPinedFilms(): Observable<PinedFilm[]> {
    return this.http.get<PinedFilm[]>(this.BASE_URL + 'pined')
  }

  /**
   * Mets à jour les film à l'affiche.
   * @param pinedFilms
   */
  setPinedFilms(pinedFilms: PinedFilm[]) {
    return this.http.post(this.BASE_URL + 'pined', pinedFilms)
  }

  /**
   * Récuperation des films à l'affiche.
   */
  getReservableFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(this.BASE_URL + 'reservable')
  }
}
