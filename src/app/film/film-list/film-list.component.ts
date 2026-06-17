import {Component, OnInit} from '@angular/core';
import {Film} from "../../../models/film.model";
import {FilmService} from "../film.service";

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {

  films: Film[] = [];

  constructor(
    private filmService: FilmService
  ) {}

  ngOnInit(): void {
    //Récuperation de tous les films:
    this.filmService.getAllFilms().subscribe({
      next: (data: Film[]) => {
        this.films = data;
      }
    });
  }
}
