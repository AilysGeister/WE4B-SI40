import { Component, OnInit } from '@angular/core';
import { FilmResult } from "../../models/filmResult.model";
import { PersonalityResult } from "../../models/personalityResult";
import {ActivatedRoute, Router} from "@angular/router";
import {Film} from "../../models/film.model";
import {FilmService} from "../film/film.service";
import {SearchService} from "./search.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  //Recherche:
  query: string | null= "";

  //Retours:
  films: FilmResult[] = [];
  personalities: PersonalityResult[] = [];

  BASE_URL = "http://localhost:8000/resources/images/";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchservice: SearchService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.query = params.get('query');
      if (this.query) {
        this.searchservice.getSearchedFilms(this.query).subscribe({
          next: (data: FilmResult[]) => {
            this.films = data;
          },
          error: (err) => {
            this.router.navigate(['/']);
          }
        });

        this.searchservice.getSearchedPersonalities(this.query).subscribe({
          next: (data: PersonalityResult[]) => {
            this.personalities = data;
          },
          error: (err) => {
            this.router.navigate(['/']);
          }
        })
      }
    });
  }
}
