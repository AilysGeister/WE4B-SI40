import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user.model";
import {Observable} from "rxjs";
import {LoginService} from "../login/login.service";
import {AuthService} from "../auth.service";
import {Film} from "../../../models/film.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ReservationService} from "../../reservation/reservation.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  BASE_URL = "http://localhost:8000/resources/images/"

  currentUser$: Observable<User | null> = this.loginService.currentUser$
  profile: User = new User();

  viewed: any = [];

  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private reservationService: ReservationService,
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
        this.reservationService.getViewedFilms(id).subscribe({
          next: (data: any[]) => {
            this.viewed = data;
            console.log(this.viewed);
          }
        })
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

  ticket(id: any) {
    this.route.paramMap.subscribe(params => {
      const uid = params.get('id');
      if (uid) {
        this.router.navigate(['/profile/' + uid + '/ticket/' + id]);
      }
    });
  }
}
