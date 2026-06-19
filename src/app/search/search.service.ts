import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FilmResult} from "../../models/filmResult.model";
import {PersonalityResult} from "../../models/personalityResult";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  //Routes API:
  FILM_URL: string = 'http://localhost:8000/api/film/search';
  PERSONANILITY_URL: string = 'http://localhost:8000/api/personality/search';

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Retrouver une liste de film par rapport à leurs titres.
   * @param query
   */
  getSearchedFilms(query: string): Observable<FilmResult[]> {
    return this.http.get<FilmResult[]>(this.FILM_URL + '?q=' + query)
  }

  /**
   * Retrouver une liste de personalitées par rapport à leurs noms.
   * @param query
   */
  getSearchedPersonalities(query: string): Observable<PersonalityResult[]> {
    return this.http.get<PersonalityResult[]>(this.PERSONANILITY_URL + '?q=' + query);
  }
}
