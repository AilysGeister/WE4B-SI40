import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {User} from "../../models/user.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_TOKEN: string = "CON_TOKEN";
  private readonly BASE_URL: string = "http://localhost:8000/api/session/";

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  isAuthenticated(): boolean {
    return sessionStorage.getItem(this.AUTH_TOKEN) !== null
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.AUTH_TOKEN)
  }

  logout(): void {
    sessionStorage.removeItem(this.AUTH_TOKEN)
    this.router.navigate(['/login'])
  }

  getProfile(id: string): Observable<User> {
    return this.http.get<User>(this.BASE_URL + 'profile/' + id)
  }
}
