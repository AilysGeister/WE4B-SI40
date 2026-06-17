import {Component, Input, OnInit} from '@angular/core';
import {Film} from "../../../models/film.model";
@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.css']
})
export class FilmCardComponent implements OnInit {

  BASE_URL = "http://localhost:8000/resources/images/films_cover/";

  @Input() film!: Film;

  constructor() {}

  ngOnInit(): void {
  }
}
