import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../users.service";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  userForm!: FormGroup;
  selectedFile: File | null = null;

  title: string = "";
  isEditMode: boolean = true;
  userId: string | null = null;

  message: string = "";
  typeResponse: string = "";

  availableRoles = [
    {key: 'ROLE_MODERATOR', label: 'Modérateur'},
    {key: 'ROLE_FUND_MANAGER', label: 'Gestionnaire'},
    {key: 'ROLE_ADMIN', label: 'Administrateur'}
  ];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.initForm();

    //Édition ou création:
    this.userId = this.route.snapshot.paramMap.get('id');

    if (this.isEditMode && this.userId) {
      this.title = "Modifier l'utilisateur";
      this.adjustValidatorsForEditMode();
      this.loadUserData(this.userId);
    } else {
      this.title = "Créer un utilisateur";
      this.isEditMode = false;
    }
  }

  initForm(): void {
    this.userForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      birthdate: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      photo: [''],
      deletePhoto: [false],
      roles: this.formBuilder.array([])
    });
  }

  getRolesFormArray(): FormArray {
    return this.userForm.get('roles') as FormArray;
  }

  isRoleChecked(roleKey: string): boolean {
    return this.getRolesFormArray().value.includes(roleKey);
  }

  /**
   * Si on est en mode édition certains champs ne sont plus obligatoire.
   * @private
   */
  private adjustValidatorsForEditMode(): void {
    const passwordControl = this.userForm.get('password');
    if (passwordControl) {
      passwordControl.setValidators([Validators.minLength(6)]);
      passwordControl.updateValueAndValidity();
    }
  }

  /**
   * Récupère les informations de l'utilisateur à modifier depuis l'API et les charge dans le formulaire.
   * @param id
   */
  loadUserData(id: string): void {
    this.userService.getUserById(id).subscribe({
      next: (user) => {
        this.userForm.patchValue({
          firstname: user.person.firstname,
          lastname: user.person.lastname,
          username: user.username,
          birthdate: user.person.birthdate,
          email: user.email
        });
        user.roles.forEach(role => {
          this.getRolesFormArray().push(new FormControl(role));
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

  /**
   * Gestion des checkbox et des rôles.
   * @param event
   */
  onRoleChange(event: any): void {
    const roleKey = event.target.value;

    if (event.target.checked) {
      // Si coché, on ajoute le rôle au tableau
      this.getRolesFormArray().push(new FormControl(roleKey));
    } else {
      // Si décoché, on cherche son index et on le supprime du tableau
      const index = this.getRolesFormArray().controls.findIndex(x => x.value === roleKey);
      if (index !== -1) {
        this.getRolesFormArray().removeAt(index);
      }
    }
  }

  onSubmit() {
    if (this.userForm.invalid) return;

    const formValue = this.userForm.value;
    const formData = new FormData();
    formData.append('firstname', formValue.firstname);
    formData.append('lastname', formValue.lastname);
    formData.append('username', formValue.username);
    formData.append('birthdate', formValue.birthdate || '');
    formData.append('email', formValue.email);
    formData.append('password', formValue.password || '');
    formData.append('deletePhoto', formValue.deletePhoto ? '1' : '0');

    //Gestion des rôles symfony:
    formValue.roles.forEach((role: string) => {
      formData.append('roles[]', role);
    });

    //Photo si uploadée:
    if (this.selectedFile) {
      formData.append('photo', this.selectedFile, this.selectedFile.name);
    }

    if (this.isEditMode && this.userId) {
      this.userService.update(this.userId, formData).subscribe({
        next: (rep: any) => {
          this.message = rep.message;
          this.typeResponse = "success";
          },
        error: (err: any) => {
          this.message = err.error?.message || 'Une erreur est survenue';
          this.typeResponse = "danger"; }
      });
    } else {
      this.userService.create(formData).subscribe({
        next: (rep: any) => {
          this.message = rep.message;
          this.typeResponse = "success";
          this.router.navigate(['/tools/users']);
        },
        error: (err: any) => {
          this.message = err.error?.message || 'Une erreur est survenue';
          this.typeResponse = "danger"; }
      });
    }
  }
}
