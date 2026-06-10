import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Récupération du token depuis le sessionStorage
    const token = sessionStorage.getItem('CON_TOKEN');

    // Si le token existe, on clone la requête pour lui ajouter le Header Authorization
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });
      return next.handle(cloned);
    }

    // Sinon on laisse passer la requête initiale sans modification
    return next.handle(req);
  }
}
