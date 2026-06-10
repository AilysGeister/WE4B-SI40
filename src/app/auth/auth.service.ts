import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_TOKEN: string = "CON_TOKEN";

  constructor(private router: Router) {}

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
}
