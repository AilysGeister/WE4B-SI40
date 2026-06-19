import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, take} from 'rxjs';
import {LoginService} from "../auth/login/login.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }

  /**
   * Permet de savoir si un utilisateur à le rôle requis pour utiliser une route.
   * @param route
   * @param state
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    //Initialisation:
    const expectedRoles = route.data['expectedRoles'] as string[];

    //On récupère les informations de l'utilisateurs actuel:
    return this.loginService.currentUser$.pipe(
      take(1),
      map(user => {
        //Si l'utilisateur n'est pas connecté on le redirige vers la page d'authentification:
        if (!user) {
          return this.router.createUrlTree(['/login']);
        }

        if (expectedRoles && expectedRoles.length > 0) {
          //Vérification que l'utilisateur possède l'un des rôles requis:
          const hasRequiredRole = user.roles.some(role => expectedRoles.includes(role));

          if (!hasRequiredRole) {
            //Si l'utilisateur est bien connecté mais n'a pas les rôles requis on le redirige vers l'acceuil:
            return this.router.createUrlTree(['/']);
          }
        }

        //Si tout les tests sont réussi alors c'est bon:
        return true;
      })
    );
  }
}
