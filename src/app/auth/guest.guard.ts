import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router'
import {LoginService} from "./login/login.service";

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.loginService.getToken()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
