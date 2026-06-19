import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {UsersService} from "../../users/users.service";
import {PersonalityService} from "../../../personality/personality.service";

@Component({
  selector: 'app-personality-form',
  templateUrl: './personality-form.component.html',
  styleUrls: ['./personality-form.component.css']
})
export class PersonalityFormComponent implements OnInit {

  personalityForm!: FormGroup;
  selectedFile: File | null = null;

  title: string = "";
  isEditMode: boolean = true;
  personId: string | null = null;

  message: string = "";
  typeResponse: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private personalityService: PersonalityService,
  ) {}

  ngOnInit(): void {
    this.initForm();

    //Édition ou création:
    this.personId = this.route.snapshot.paramMap.get('id');

    if (this.isEditMode && this.personId) {
      this.title = "Modifier la personnalité";
      this.loadPersonalityData(this.personId);
    } else {
      this.title = "Créer une personnalité";
      this.isEditMode = false;
    }
  }

  initForm(): void {
    this.personalityForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      birthdate: ['', [Validators.required]],
      photo: [''],
      deletePhoto: [false],
    });
  }

  loadPersonalityData(id: string): void {
    this.personalityService.getById(id).subscribe({
      next: (personality) => {
        this.personalityForm.patchValue({
          firstname: personality.firstname,
          lastname: personality.lastname,
          birthdate: personality.birthdate,
        });
      },
      error: (err) => {
        this.message = "Erreur lors du chargement de l'utilisateur";
        this.typeResponse = "danger";
      }
    });
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
    if (this.personalityForm.invalid) return;

    const formValue = this.personalityForm.value;
    const formData = new FormData();
    formData.append('firstname', formValue.firstname);
    formData.append('lastname', formValue.lastname);
    formData.append('birthdate', formValue.birthdate || '');
    formData.append('deletePhoto', formValue.deletePhoto ? '1' : '0');

    //Photo si uploadée:
    if (this.selectedFile) {
      formData.append('photo', this.selectedFile, this.selectedFile.name);
    }

    if (this.isEditMode && this.personId) {
      this.personalityService.update(this.personId, formData).subscribe({
        next: (rep: any) => {
          this.message = rep.message;
          this.typeResponse = "success";
        },
        error: (err: any) => {
          this.message = err.error?.message || 'Une erreur est survenue';
          this.typeResponse = "danger"; }
      });
    } else {
      this.personalityService.create(formData).subscribe({
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
