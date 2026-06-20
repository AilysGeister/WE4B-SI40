import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Lang} from "../../../models/lang.model";
import {Observable} from "rxjs";
import {User} from "../../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class LangService {

  BASE_URL = "http://localhost:8000/api/lang/";

  constructor(
    private http: HttpClient
  ) {}

  public create(formData: FormData): Observable<any> {
    return this.http.post<User>(this.BASE_URL + 'create', formData);
  }

  public getAll(): Observable<Lang[]> {
    return this.http.get<Lang[]>(this.BASE_URL);
  }

  public getById(id: String): Observable<Lang> {
    return this.http.get<Lang>(this.BASE_URL + id);
  }

  public update(id: string, formData: FormData): Observable<Lang> {
    return this.http.put<Lang>(this.BASE_URL + id, formData);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete(this.BASE_URL + id);
  }
}

