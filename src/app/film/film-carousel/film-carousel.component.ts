import {Component, OnInit} from '@angular/core';
import {Film} from "src/models/film.model";

@Component({
  selector: 'app-film-carousel',
  templateUrl: './film-carousel.component.html',
  styleUrls: ['./film-carousel.component.css']
})
export class FilmCarouselComponent implements OnInit {

  pinnedFilms: Film[] = [];

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
