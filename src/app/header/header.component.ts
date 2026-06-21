import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { LoginService } from '../auth/login/login.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  BASE_URL = "http://localhost:8000/resources/images/profil_pictures/";

  currentUser$: Observable<User | null> = this.loginService.currentUser$;

  searchQuery: string = '';
  searchResults: string[] = [];
  private searchTerms = new Subject<string>();

  constructor(
    private router: Router,
    private http: HttpClient,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.http.post<string[]>('/api/search', { query: term }))
    ).subscribe({
      next: (data) => this.searchResults = data
    });
  }

  onSearchInput(term: string): void {
    this.searchTerms.next(term);
  }

  onSearchSubmit(event: Event): void {
    event.preventDefault();
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search', this.searchQuery]);
    }
  }

  hasRole(user: User | null, roles: string[]): boolean {
    if (!user) return false;
    return user.roles.some(role => roles.includes(role));
  }

  logout(): void {
    this.loginService.requestLogout().subscribe({
      complete: () => this.router.navigate(['/login'])
    });
  }
}
