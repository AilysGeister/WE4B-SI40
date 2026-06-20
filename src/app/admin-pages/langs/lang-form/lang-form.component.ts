import { Component, OnInit } from '@angular/core';
import {LangService} from "../lang.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Lang} from "../../../../models/lang.model";

@Component({
  selector: 'app-lang-form',
  templateUrl: './lang-form.component.html',
  styleUrls: ['./lang-form.component.css']
})
export class LangFormComponent implements OnInit {

  langForm!: FormGroup;

  title: string = "";
  isEditMode: boolean = true;
  langId: string | null = null

  message: string = "";
  typeResponse: string = "";

  constructor(
    private langService: LangService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.initForm();

    //Édition ou création:
    this.langId = this.route.snapshot.paramMap.get('id');

    if (this.isEditMode && this.langId) {
      this.title = "Modifier la langue";
      this.loadLangData(this.langId);
    } else {
      this.title = "Créer une langue";
      this.isEditMode = false;
    }
  }

  initForm(): void {
    this.langForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    });
  }

  loadLangData(id: string): void {
    this.langService.getById(id).subscribe({
      next: (lang: Lang) => {
        this.langForm.patchValue({
          name: lang.name,
        });
      },
      error: (err) => {
        this.message = "Erreur lors du chargement de la langue";
        this.typeResponse = "danger";
      }
    });
  }

  onSubmit() {
    if (this.langForm.invalid) return;

    const formValue = this.langForm.value;
    const formData = new FormData();
    formData.append('name', formValue.name);

    if (this.isEditMode && this.langId) {
      this.langService.update(this.langId, formData).subscribe({
        next: (rep: any) => {
          this.message = rep.message;
          this.typeResponse = "success";
        },
        error: (err: any) => {
          this.message = err.error?.message || 'Une erreur est survenue';
          this.typeResponse = "danger"; }
      });
    } else {
      this.langService.create(formData).subscribe({
        next: (rep: any) => {
          this.message = rep.message;
          this.typeResponse = "success";
          this.router.navigate(['/tools/langs']);
        },
        error: (err: any) => {
          this.message = err.error?.message || 'Une erreur est survenue';
          this.typeResponse = "danger"; }
      });
    }
  }
}
