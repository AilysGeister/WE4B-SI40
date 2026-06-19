import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user.model";
import {Observable} from "rxjs";
import {LoginService} from "../login/login.service";
import {AuthService} from "../auth.service";
import {Film} from "../../../models/film.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  BASE_URL = "http://localhost:8000/resources/images/profil_pictures/"

  currentUser$: Observable<User | null> = this.loginService.currentUser$
  profile: User = new User();

  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
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
  }

  canViewAll(): boolean {
    const currentUser = this.loginService.getCurrentUserValue();
    if (!currentUser) return false;
    const isTheOne = currentUser.id === this.profile.id;
    const isMod = (currentUser.getHighestRole() === 'Administrateur');
    return isTheOne || isMod;
  }
}
