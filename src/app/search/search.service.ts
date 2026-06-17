import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FilmResult } from "../../models/filmResult.model";
import { PersonalityResult } from "../../models/personalityResult";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  //Routes API:
  FILM_URL: string = 'http://localhost:8000/api/film';
  PERSONANILITY_URL: string = 'http://localhost:8000/api/personality';

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Retrouver une liste de film par rapport à leurs titres.
   * @param query
   */
  getSearchedFilms(query: string): FilmResult[] {
    return [];
  }

  /**
   * Retrouver une liste de personalitées par rapport à leurs noms.
   * @param query
   */
  getPersonalitiesResults(query: string): PersonalityResult[] {
    return [];
  }
}
