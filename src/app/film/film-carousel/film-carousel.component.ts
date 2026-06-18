import {Component, Input, OnInit} from '@angular/core';
import {Film} from "src/models/film.model";
import {PinedFilm} from "../../../models/pinedFilm.model";

@Component({
  selector: 'app-film-carousel',
  templateUrl: './film-carousel.component.html',
  styleUrls: ['./film-carousel.component.css']
})
export class FilmCarouselComponent implements OnInit {

  @Input() pinnedFilms: PinedFilm[] = [];

  BASE_URL = "http://localhost:8000/resources/images/films_cover/";

  constructor() {}

  ngOnInit(): void {
  }

  formatDuration(minutes: number): string {
    if (!minutes) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours + 'h' + mins.toString().padStart(2, '0');
  }
}
