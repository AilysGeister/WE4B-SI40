import {Component, OnInit} from '@angular/core';
import {Film} from "../../../models/film.model";

@Component({
  selector: 'app-film-slider',
  templateUrl: './film-slider.component.html',
  styleUrls: ['./film-slider.component.css']
})
export class FilmSliderComponent implements OnInit {

  films: Film[] = [];

  constructor() {}

  ngOnInit(): void {
  }
}
