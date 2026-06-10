import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../../models/user.model";
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  currentUser$: Observable<User | null> = this.loginService.currentUser$;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

}
