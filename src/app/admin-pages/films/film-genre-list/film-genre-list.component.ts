import { Component, OnInit } from '@angular/core';
import {Film} from "../../../../models/film.model";
import {FilmService} from "../../../film/film.service";
import {Genre} from "../../../../models/Genre";
import {GenreService} from "../genre.service";

@Component({
  selector: 'app-film-genre-list',
  templateUrl: './film-genre-list.component.html',
  styleUrls: ['./film-genre-list.component.css']
})
export class FilmGenreListComponent implements OnInit {

  films: Film[] = [];
  genres: Genre[] = [];

  selectedSort: string = 'ID-ASC';

  constructor(
    private filmService: FilmService,
    private genreService: GenreService,
  ) { }

  ngOnInit(): void {
    this.filmService.getAllFilms().subscribe({
      next: (data: Film[]) => {
        this.films = data;
        this.films.sort((a, b) => a.id - b.id);
      }
    });
    this.genreService.getAll().subscribe({
      next: (data: Genre[]) => {
        this.genres = data;
        this.genres.sort((a, b) => a.id - b.id);
      }
    });
  }

  onDeleteFilm(id: number) {
    if (id && confirm("Êtes-vous sûr de vouloir supprimer ce film ? (Cette action est irréversible !)")) {
      this.filmService.delete(id.toString()).subscribe({
        next: () => {
          this.films = this.films.filter(film => film.id !== id);
        },
        error: (err) => {
          alert("Une erreur est survenue lors de la suppression.");
        }
      });
    }
  }

  onDeleteGenre(id: number) {
    if (id && confirm("Êtes-vous sûr de vouloir supprimer ce genre ? (Cette action est irréversible !)")) {
      this.genreService.delete(id.toString()).subscribe({
        next: () => {
          this.genres = this.genres.filter(genre => genre.id !== id);
        },
        error: (err) => {
          alert("Une erreur est survenue lors de la suppression.");
        }
      });
    }
  }

  onFilmFilterChange() {
    //Initialisation:
    let tempFilms = this.films;

    //Type dde tri:
    tempFilms.sort((a, b) => {
      switch (this.selectedSort) {
        case 'ID-ASC':
          return a.id - b.id;
        case 'ID-DESC':
          return b.id - a.id;
        case 'ALPHA-ASC':
          return a.title.localeCompare(b.title);
        case 'ALPHA-DESC':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    this.films = tempFilms;
  }

  onGenreFilterChange() {
    //Initialisation:
    let tempGenre = this.genres;

    //Type dde tri:
    tempGenre.sort((a, b) => {
      switch (this.selectedSort) {
        case 'ID-ASC':
          return a.id - b.id;
        case 'ID-DESC':
          return b.id - a.id;
        case 'ALPHA-ASC':
          return a.name.localeCompare(b.name);
        case 'ALPHA-DESC':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    this.genres = tempGenre;
  }
}
