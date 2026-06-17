import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../models/user.model";
import {LoginService} from "../auth/login/login.service";

@Component({
  selector: 'app-admin-pages',
  templateUrl: './admin-pages.component.html',
  styleUrls: ['./admin-pages.component.css']
})
export class AdminPagesComponent implements OnInit {

  currentUser$: Observable<User | null> = this.loginService.currentUser$;

  constructor(
    private loginService: LoginService,
  ) {}

  ngOnInit(): void {
  }

}
