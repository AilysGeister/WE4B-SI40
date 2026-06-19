import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../../models/user.model";
import {LoginService} from "../login/login.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EditProfileService} from "./edit-profile.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  BASE_URL = "http://localhost:8000/resources/images/profil_pictures/"

  currentUser$: Observable<User | null> = this.loginService.currentUser$
  profile!: User;

  photoForm!: FormGroup;
  personalDataForm!: FormGroup;
  emailForm!: FormGroup;
  passwordForm!: FormGroup;
  messagePhoto: String = "";
  messagePersonalDatas: String = "";
  messageEmail: String = "";
  messagePassword: String = "";
  typeResponse: String = ""

  selectedFile: File | null = null;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private editProfileService: EditProfileService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    //Initialisation des informations utilisateurs:
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.authService.getProfile(id).subscribe({
          next: (data: User) => {
            this.profile = data;
          },
          error: (err) => {
            this.router.navigate(['/']);
          }
        });
      }
    });

    //Initialisation des formualires:
    this.photoForm = this.formBuilder.group({
      deletePhoto: [''],
      photo: [null],
    })

    this.personalDataForm = this.formBuilder.group({
      firstname: ['', [Validators.minLength(3), Validators.maxLength(50)]],
      lastname: ['', [Validators.minLength(3), Validators.maxLength(50)]],
      username: ['', [Validators.minLength(3), Validators.maxLength(50)]],
      birthdate: [''],
    })

    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      passwordEmail: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]]
    })

    this.passwordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]]
    })
  }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onPhotoFormSubmit() {
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }
    formData.append('deletePhoto', this.photoForm.get('deletePhoto')?.value ? 'true' : 'false');
    this.editProfileService.updatePhoto(formData).subscribe({
      next: (rep: any) => {
        this.typeResponse = 'success';
        this.messagePhoto = rep.message;
        setTimeout(() => {
          this.router.navigate(['/profile', this.profile.id, 'edit']);
        }, 1500);
      },
      error: (err) => {
        this.typeResponse = 'danger';
        this.messagePhoto = err.message;
      }
    })
  }

  onPersonalDataFormSubmit() {
    const body = {
      firstname: this.personalDataForm.get('firstname')?.value,
      lastname: this.personalDataForm.get('lastname')?.value,
      username: this.personalDataForm.get('username')?.value,
      birthdate: this.personalDataForm.get('birthdate')?.value || null
    };
    this.editProfileService.updatePersonalDatas(body).subscribe({
      next: (rep: any) => {
        this.loginService.updateCurrentUser({
          username: body.username,
          person: {
            ...this.profile.person,
            firstname: body.firstname,
            lastname: body.lastname,
            birthdate: body.birthdate
          }
        });
        this.typeResponse = 'success';
        this.messagePersonalDatas = rep.message;
        setTimeout(() => {
          this.router.navigate(['/profile', this.profile.id, 'edit']);
        }, 1500);
      },
      error: (err) => {
        this.typeResponse = 'danger';
        this.messagePersonalDatas = err.error?.message || err.message;
      }
    });
  }

  onEmailFormSubmit() {
    if (this.emailForm.invalid) return;
    const body = {
      email: this.emailForm.get('email')?.value,
      password: this.emailForm.get('passwordEmail')?.value
    };
    this.editProfileService.updateEmail(body).subscribe({
      next: (rep: any) => {
        this.typeResponse = 'success';
        this.messageEmail = rep.message;
        setTimeout(() => {
          this.router.navigate(['/profile', this.profile.id, 'edit']);
        }, 1500);
      },
      error: (err) => {
        this.typeResponse = 'danger';
        this.messageEmail = err.error?.message || err.message;
      }
    });
  }

  onPasswordFormSubmit() {
    if (this.passwordForm.invalid) return;
    const body = {
      password: this.passwordForm.get('password')?.value,
      newPassword: this.passwordForm.get('newPassword')?.value,
      confirmPassword: this.passwordForm.get('confirmPassword')?.value
    };
    if (body.newPassword !== body.confirmPassword) {
      this.typeResponse = 'danger';
      this.messagePassword = 'Les nouveaux mots de passe ne correspondent pas.';
      return;
    }
    this.editProfileService.updatePassword(body).subscribe({
      next: (rep: any) => {
        this.typeResponse = 'success';
        this.messagePassword = rep.message;
        this.passwordForm.reset();
        //On déconnecte l'utilisateur car son token d'API viens également d'être modifié:
        setTimeout(() => {
          this.router.navigate(['/logout']);
        }, 1500);
      },
      error: (err) => {
        this.typeResponse = 'danger';
        this.messagePassword = err.error?.message || err.message;
      }
    });
  }
}
