import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {FilmService} from "../../../film/film.service";
import {Genre} from "../../../../models/Genre";
import {Person} from "../../../../models/person.model";

@Component({
  selector: 'app-film-form',
  templateUrl: './film-form.component.html',
  styleUrls: ['./film-form.component.css']
})
export class FilmFormComponent implements OnInit {
  filmForm!: FormGroup;
  selectedFile: File | null = null;

  title: string = "";
  isEditMode: boolean = true;
  filmId: string | null = null;
  genresId: number[] = [];
  filmGenres: Genre[] = [];
  actorsId: number[] = [];
  directorsId: number[] = [];
  filmActors: Person[] = [];
  filmDirectors: Person[] = [];

  message: string = "";
  typeResponse: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private filmService: FilmService,
  ) {}

  ngOnInit(): void {
    this.initForm();

    //Édition ou création:
    this.filmId = this.route.snapshot.paramMap.get('id');

    if (this.isEditMode && this.filmId) {
      this.title = "Modifier le film";
      this.loadFilmData(this.filmId);
    } else {
      this.title = "Créer un film";
      this.isEditMode = false;
    }
  }

  initForm(): void {
    this.filmForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      slug: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      duration: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      cover: [''],
      deleteCover: [false],
    });
  }

  loadFilmData(id: string): void {
    this.filmService.getFilmById(id).subscribe({
      next: (film) => {
        this.filmForm.patchValue({
          title: film.title,
          description: film.description,
          slug: film.slug,
          price: film.price,
          duration: film.duration,
        });
        if (film.genres) this.filmGenres = film.genres;
        if (film.actors) this.filmActors = film.actors;
        if (film.directors) this.filmDirectors = film.directors;
      },
      error: (err) => {
        this.message = "Erreur lors du chargement du film";
        this.typeResponse = "danger";
      }
    });
  }

  onActorsChanged(ids: number[]): void {
    this.actorsId = ids;
  }

  onDirectorsChanged(ids: number[]): void {
    this.directorsId = ids;
  }

  onGenresChanged(ids: number[]): void {
    this.genresId = ids;
  }

  /**
   * Gestion des fichiers uploadés.
   * @param event
   */
  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit() {
    if (this.filmForm.invalid) return;

    const formValue = this.filmForm.value;
    const formData = new FormData();
    formData.append('title', formValue.title);
    formData.append('slug', formValue.slug);
    formData.append('description', formValue.description);
    formData.append('price', formValue.price.toString());
    formData.append('duration', formValue.duration.toString());
    formData.append('deleteCover', formValue.deleteCover ? '1' : '0');
    formData.append('genres', JSON.stringify(this.genresId));
    formData.append('actors', JSON.stringify(this.actorsId));
    formData.append('directors', JSON.stringify(this.directorsId));

    //Photo si uploadée:
    if (this.selectedFile) {
      formData.append('cover', this.selectedFile, this.selectedFile.name);
    }

    if (this.isEditMode && this.filmId) {
      this.filmService.update(this.filmId, formData).subscribe({
        next: (rep: any) => {
          this.message = rep.message;
          this.typeResponse = "success";
        },
        error: (err: any) => {
          this.message = err.error?.message || 'Une erreur est survenue';
          this.typeResponse = "danger"; }
      });
    } else {
      this.filmService.create(formData).subscribe({
        next: (rep: any) => {
          this.message = rep.message;
          this.typeResponse = "success";
        },
        error: (err: any) => {
          this.message = err.error?.message || 'Une erreur est survenue';
          this.typeResponse = "danger"; }
      });
    }
  }
}
