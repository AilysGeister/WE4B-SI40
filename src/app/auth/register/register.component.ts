import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegisterService} from "./register.service";
import {LoginService} from "../login/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  message: string = "";
  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      birthdate: [''],
      photo: [null],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]]
    });
  }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    //Tant que les champs ne sont pas correct il est impossible de valider le formulaire:
    if (this.registerForm.invalid) {
      return;
    }

    //Vérification du mot de passe:
    if (this.registerForm.get('password')?.value.equals(this.registerForm.get('confirmPassword')?.value)) {
      this.message = "Les mots de passe ne correspondent pas."
      return;
    }

    //Récuperation des champs du formulaire pour l'API:
    const formData = new FormData();
    formData.append('firstname', this.registerForm.get('firstname')?.value);
    formData.append('lastname', this.registerForm.get('lastname')?.value);
    formData.append('username', this.registerForm.get('username')?.value);
    formData.append('birthdate', this.registerForm.get('birthdate')?.value || '');
    formData.append('email', this.registerForm.get('email')?.value);
    formData.append('password', this.registerForm.get('password')?.value);

    //Cas où il y a une photo:
    if (this.selectedFile) {
      formData.append('photo', this.selectedFile, this.selectedFile.name);
    }

    this.registerService.register(formData).subscribe({
      next: (response) => {
        return this.loginService.getMe();
        this.router.navigate(['/']);
      },
      //Message d'erreur en cas d'échec:
      error: (err) => {
        this.message = err.error?.message || "Une erreur est survenue lors de l'inscription.";
      }
    });
  }
}
