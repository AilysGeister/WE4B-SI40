import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../../models/user.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  BASE_URL = "http://localhost:8000/api/session/";

  constructor(
    private http: HttpClient,
  ) {}

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.BASE_URL + 'users');
  }

  public getUserById(id: string): Observable<User> {
    return this.http.get<User>(this.BASE_URL + 'user/' + id);
  }

  public create(formData: FormData): Observable<User> {
    return this.http.post<User>(this.BASE_URL + 'user/create', formData);
  }

  public update(id: string, formData: FormData): Observable<User> {
    return this.http.post<User>(this.BASE_URL + 'user/' + id, formData);
  }

  public delete(id: string): Observable<User> {
    return this.http.delete<User>(this.BASE_URL + 'user/' + id);
  }
}
