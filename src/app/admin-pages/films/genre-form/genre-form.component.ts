import { Component, OnInit } from '@angular/core';
import {GenreService} from "../genre.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Genre} from "../../../../models/Genre";

@Component({
  selector: 'app-genre-form',
  templateUrl: './genre-form.component.html',
  styleUrls: ['./genre-form.component.css']
})
export class GenreFormComponent implements OnInit {

  genreForm!: FormGroup;

  title: string = "";
  isEditMode: boolean = true;
  genreId: string | null = null

  message: string = "";
  typeResponse: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private genreService: GenreService,
  ) { }

  ngOnInit(): void {
    this.initForm();

    //Édition ou création:
    this.genreId = this.route.snapshot.paramMap.get('id');

    if (this.isEditMode && this.genreId) {
      this.title = "Modifier le genre";
      this.loadGenreData(this.genreId);
    } else {
      this.title = "Créer un genre";
      this.isEditMode = false;
    }
  }

  initForm(): void {
    this.genreForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    });
  }

  loadGenreData(id: string): void {
    this.genreService.getById(id).subscribe({
      next: (genre: Genre) => {
        this.genreForm.patchValue({
          name: genre.name,
        });
      },
      error: (err) => {
        this.message = "Erreur lors du chargement du genre";
        this.typeResponse = "danger";
      }
    });
  }

  onSubmit() {
    if (this.genreForm.invalid) return;

    const formValue = this.genreForm.value;
    const formData = new FormData();
    formData.append('name', formValue.name);

    if (this.isEditMode && this.genreId) {
      this.genreService.update(this.genreId, formData).subscribe({
        next: (rep: any) => {
          this.message = rep.message;
          this.typeResponse = "success";
        },
        error: (err: any) => {
          this.message = err.error?.message || 'Une erreur est survenue';
          this.typeResponse = "danger"; }
      });
    } else {
      this.genreService.create(formData).subscribe({
        next: (rep: any) => {
          this.message = rep.message;
          this.typeResponse = "success";
          this.router.navigate(['/tools/genres']);
        },
        error: (err: any) => {
          this.message = err.error?.message || 'Une erreur est survenue';
          this.typeResponse = "danger"; }
      });
    }
  }
}
