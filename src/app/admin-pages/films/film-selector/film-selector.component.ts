import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Film} from "../../../../models/film.model";
import {FilmService} from "../../../film/film.service";

@Component({
  selector: 'app-film-selector',
  templateUrl: './film-selector.component.html',
  styleUrls: ['./film-selector.component.css']
})
export class FilmSelectorComponent implements OnInit {
  @Input() label: string = 'Rechercher des films';
  @Input() placeholder: string = 'Tapez un titre...';

  @Input() set initialFilms(films: Film[] | undefined) {
    if (films) {
      this.selectedFilms = [...films];
      this.emitChanges();
    }
  }

  @Output() selectedFilmIds = new EventEmitter<number[]>();

  allFilms: Film[] = [];
  filteredFilms: Film[] = [];
  selectedFilms: Film[] = [];
  searchQuery: string = '';

  constructor(
    private filmService: FilmService
  ) {}

  ngOnInit(): void {
    this.filmService.getAllFilms().subscribe({
      next: (films) => this.allFilms = films,
      error: (err) => console.error('Erreur lors de la récupération des films', err)
    });
  }

  onSearchChange(): void {
    if (!this.searchQuery.trim()) {
      this.filteredFilms = [];
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.filteredFilms = this.allFilms.filter(film => {
      return film.title.toLowerCase().includes(query) && !this.isAlreadySelected(film);
    });
  }

  selectFilm(film: Film): void {
    if (!this.isAlreadySelected(film)) {
      this.selectedFilms.push(film);
      this.searchQuery = '';
      this.filteredFilms = [];
      this.emitChanges();
    }
  }

  removeFilm(film: Film): void {
    const index = this.selectedFilms.indexOf(film);
    if (index !== -1) {
        this.selectedFilms.splice(index, 1);
    }
    this.emitChanges();
  }

  private isAlreadySelected(film: Film): boolean {
    return this.selectedFilms.some(f => f.id === film.id);
  }

  private emitChanges(): void {
    const ids = this.selectedFilms.map(f => f.id);
    this.selectedFilmIds.emit(ids);
  }
}
