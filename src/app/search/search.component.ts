import { Component, OnInit } from '@angular/core';
import { FilmResult } from "../../models/filmResult.model";
import { PersonalityResult } from "../../models/personalityResult";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  //Recherche:
  query: string | undefined = "";

  //Retours:
  films: FilmResult[] = [];
  personalities: PersonalityResult[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
