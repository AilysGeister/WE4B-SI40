import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {SearchService} from "../../search/search.service";
import {FilmResult} from "../../../models/filmResult.model";

@Component({
  selector: 'app-search-film',
  templateUrl: './search-film.component.html',
  styleUrls: ['./search-film.component.css']
})
export class SearchFilmComponent implements OnInit {

  @Output() film = new EventEmitter<FilmResult | null>();

  searchControl = new FormControl('');
  films$!: Observable<FilmResult[]>;
  filmSelectionne: FilmResult | null = null;
  isVisible = false;

  constructor(
    private searchService: SearchService,
  ) {}

  ngOnInit(): void {
    this.films$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => {
        const query = value ? value.trim() : '';
        if (query === '') {
          this.isVisible = false;
          return of([]);
        }
        this.isVisible = true;
        return this.searchService.getSearchedFilms(query);
      })
    );
  }

  select(film: FilmResult): void {
    this.filmSelectionne = film;
    this.searchControl.setValue(film.title, { emitEvent: false });
    this.film.emit(film);
  }

  reset(): void {
    this.filmSelectionne = null;
    this.searchControl.setValue('');
    this.film.emit(null);
  }
}
