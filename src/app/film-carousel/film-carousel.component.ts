import { Component, OnInit } from '@angular/core';
import { Film } from "src/models/Film";

@Component({
  selector: 'app-film-carousel',
  templateUrl: './film-carousel.component.html',
  styleUrls: ['./film-carousel.component.css']
})
export class FilmCarouselComponent implements OnInit {

  pinnedFilms: Film[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  formatDuration(minutes: number): string {
    if (!minutes) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    // Le padStart permet d'écrire "05" au lieu de "5"
    return `${hours}h${mins.toString().padStart(2, '0')}`;
  }
}
