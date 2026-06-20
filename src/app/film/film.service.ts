import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpContext} from "@angular/common/http";
import {Film} from "../../models/film.model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {PinedFilm} from "../../models/pinedFilm.model";
import {SKIP_AUTH} from "../auth/auth.interceptor";

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private BASE_URL = "http://localhost:8000/api/film";
  private readonly publicRequestContext = new HttpContext().set(SKIP_AUTH, true);

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Création d'un film via l'API.
   * @param formData Données du film.
   */
  create(formData: FormData): Observable<any> {
    return this.http.post<Film>(`${this.BASE_URL}/create`, formData);
  }

  /**
   * Récupère le JSON d'un film unique de l'API grâce à son slug.
   * @param slug Slug du film à charger.
   */
  getFilmBySlug(slug: string): Observable<Film> {
    return this.http.get<any[]>(`${this.BASE_URL}/${slug}`, {
      context: this.publicRequestContext
    }).pipe(
      map((parseJson: any) => {
        if (Array.isArray(parseJson) && parseJson.length > 0) {
          return new Film(parseJson[0]);
        }
        return new Film(parseJson);
      })
    );
  }

  /**
   * Récupère le JSON d'un film unique de l'API grâce à son identifiant.
   * @param id Identifiant du film à charger.
   */
  getFilmById(id: String): Observable<Film> {
    return this.http.get<any>(`${this.BASE_URL}/${id}/fetch`);
  }

  /**
   * Récupèration des programmes par films.
   * @param id
   */
  getProgrammesByFilmId(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/${id}/programmes`, {
      context: this.publicRequestContext
    });
  }

  /**
   * Récuperation de tous les films en JSON.
   */
  getAllFilms(): Observable<Film[]> {
    return this.http.get<any[]>(this.BASE_URL, {
      context: this.publicRequestContext
    }).pipe(
      map((jsonArray: any[]) => {
        return jsonArray.map(filmJson => new Film(filmJson));
      })
    );
  }

  /**
   * Récuperation des films à l'affiche.
   */
  getPinedFilms(): Observable<PinedFilm[]> {
    return this.http.get<PinedFilm[]>(`${this.BASE_URL}/pined`, {
      context: this.publicRequestContext
    })
  }

  /**
   * Mets à jour les film à l'affiche.
   * @param pinedFilms
   */
  setPinedFilms(pinedFilms: PinedFilm[]) {
    return this.http.post(`${this.BASE_URL}/pined`, pinedFilms)
  }

  /**
   * Récuperation des films à l'affiche.
   */
  getReservableFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.BASE_URL}/reservable`, {
      context: this.publicRequestContext
    })
  }

  /**
   * Met à jour un film via l'API.
   * @param id
   * @param formDate
   */
  update(id: string, formDate: FormData): Observable<any> {
    return this.http.post(`${this.BASE_URL}/${id}`, formDate)
  }

  /**
   * Permet d'envoyer l'ordre de suppression à l'API.
   * @param id
   */
  delete(id: string) {
    return this.http.delete<any>(`${this.BASE_URL}/${id}`);
  }
}
