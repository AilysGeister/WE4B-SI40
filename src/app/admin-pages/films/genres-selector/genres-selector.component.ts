import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Genre} from 'src/models/Genre';
import {GenreService} from '../genre.service';

@Component({
  selector: 'app-genres-selector',
  templateUrl: './genres-selector.component.html',
  styleUrls: ['./genres-selector.component.css']
})
export class GenresSelectorComponent implements OnInit {
  @Output() selectedGenreIds = new EventEmitter<number[]>();

  @Input() set initialGenres(genres: Genre[] | undefined) {
    if (genres) {
      this.selectedGenres = [...genres];
      this.emitChanges();
    }
  }

  allGenres: Genre[] = [];
  filteredGenres: Genre[] = [];
  selectedGenres: Genre[] = [];
  searchQuery: string = '';

  constructor(private genreService: GenreService) {}

  ngOnInit(): void {
    this.genreService.getAll().subscribe({
      next: (genres) => this.allGenres = genres,
      error: (err) => console.error(err)
    });
  }

  onSearchChange(): void {
    if (!this.searchQuery.trim()) {
      this.filteredGenres = [];
      return;
    }
    const query = this.searchQuery.toLowerCase();
    this.filteredGenres = this.allGenres.filter(genre =>
      genre.name.toLowerCase().includes(query) && !this.isAlreadySelected(genre)
    );
  }

  selectGenre(genre: Genre): void {
    if (!this.isAlreadySelected(genre)) {
      this.selectedGenres.push(genre);
      this.searchQuery = '';
      this.filteredGenres = [];
      this.emitChanges();
    }
  }

  removeGenre(genre: Genre): void {
    this.selectedGenres = this.selectedGenres.filter(g => g.id !== genre.id);
    this.emitChanges();
  }

  private isAlreadySelected(genre: Genre): boolean {
    return this.selectedGenres.some(g => g.id === genre.id);
  }

  private emitChanges(): void {
    const ids = this.selectedGenres.map(g => g.id);
    this.selectedGenreIds.emit(ids);
  }
}
