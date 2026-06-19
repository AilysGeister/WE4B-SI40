import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LoginService} from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class EditProfileGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.loginService.getCurrentUserValue();
    const profileIdInUrl = route.paramMap.get('id');

    if (currentUser && currentUser.id.toString() === profileIdInUrl) {
      return true;
    }

    if (currentUser && (currentUser.id.toString() === profileIdInUrl || currentUser.getHighestRole() === 'Administrateur')) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
