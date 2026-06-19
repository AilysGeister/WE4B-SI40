import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, tap, switchMap } from "rxjs";
import { User } from "../../../models/user.model";
import { map } from "rxjs/operators";

export interface Credentials {
  email: string;
  password: string;
}

interface TokenResponse {
  AUTH_TOKEN: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //Lien avec l'API:
  private readonly TOKEN_KEY: string = "CON_TOKEN";
  private readonly BASE_URL: string = "http://localhost:8000/api/session";

  //Lecture de l'utilisateur actuel dans le reste de l'application:
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.autoLogin();
  }

  /**
   * Récupère les informations de l'utilisateur déjà connecté.
   * @private
   */
  private autoLogin(): void {
    const token = sessionStorage.getItem(this.TOKEN_KEY);
    if (!token) {
      return;
    }
    this.getMe().subscribe({
      next: (user: User) => {
        this.currentUserSubject.next(user);
      },
      error: (err) => {
        this.logout();
      }
    });
  }

  /**
   * Récupère les informations de connexion depuis le formulaire et intérroge l'API pour les vérifier.
   * Si les informations sont correcte on créer l'utilisateur.
   * @param credentials Informations de connexion (email, mot de passe).
   */
  login(credentials: Credentials): void {
    this.http.post<TokenResponse>(`${this.BASE_URL}/login`, credentials).pipe(
      tap((response) => {
        if (response && response.AUTH_TOKEN) {
          this.storeToken(response.AUTH_TOKEN);
        }
      }),
      switchMap(() => this.getMe())
    ).subscribe({
      next: (user: User) => {
        this.currentUserSubject.next(user);
        this.router.navigate(['/']);
      }
    });
  }

  /**
   * Déconnecte l'utilisateur en supprimant le informations de session relative à l'authentification.
   */
  logout(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    this.currentUserSubject.next(null);
  }

  /**
   * Demande les informations de l'utilisateur connecté à l'API.
   * @private
   */
  public getMe(): Observable<User> {
    return this.http.get<User>(this.BASE_URL + '/me').pipe(
      map((json: any) => {
        const userInstance = new User();
        Object.assign(userInstance, json);
        return userInstance;
      })
    );
  }

  /**
   * Renvoie l'utilisateur courant.
   */
  public getCurrentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Enregistre le jeton de connexion dans le stockage de session.
   * @param token
   */
  storeToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token)
  }

  /**
   * Lis le jeton de connexion enregistré dans le stockage de session.
   */
  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Mets à jour les informations de l'utilisateur.
   * @param updatedUser
   */
  updateCurrentUser(updatedUser: Partial<User>): void {
    const current = this.currentUserSubject.value;
    if (current) {
      const newUser = { ...current, ...updatedUser };
      this.currentUserSubject.next(newUser as User);
    }
  }
}
