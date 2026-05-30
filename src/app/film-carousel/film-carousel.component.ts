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

  protected readonly Math = Math;
}
