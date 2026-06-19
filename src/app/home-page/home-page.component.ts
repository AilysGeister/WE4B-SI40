import {Component, OnInit} from '@angular/core';
import {PinedFilm} from "../../models/pinedFilm.model";
import {FilmService} from "../film/film.service";
import {Film} from "../../models/film.model";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  pinedFilms: PinedFilm[] = [];
  reservableFilms: Film[] = [];

  constructor(
    private filmService: FilmService,
  ) {}

  ngOnInit(): void {
    this.filmService.getPinedFilms().subscribe({
        next: (data: PinedFilm[]) => {
          this.pinedFilms = data;
        }
    });

    this.filmService.getReservableFilms().subscribe({
      next: (data: Film[]) => {
        this.reservableFilms = data;
      }
    });
  }
}
