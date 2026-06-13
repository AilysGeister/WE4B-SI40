import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Film} from "../../models/film.model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

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

  getAllFilms(): Observable<Film[]> {
    return this.http.get<any[]>(this.BASE_URL).pipe(
      map((jsonArray: any[]) => {
        return jsonArray.map(filmJson => new Film(filmJson));
      })
    );
  }
}
