import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Genre} from "../../../models/Genre";

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  BASE_URL = "http://localhost:8000/api/genre/";

  constructor(
    private http: HttpClient,
  ) {}

  create(formDate: FormData): Observable<any> {
    return this.http.post<any>(this.BASE_URL + 'create', formDate)
  }

  getAll(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.BASE_URL);
  }

  getById(id: string): Observable<Genre> {
    return this.http.get<Genre>(this.BASE_URL + id);
  }

  update(id: string, formData: FormData): Observable<any> {
    return this.http.put<any>(this.BASE_URL + id, formData)
  }

  delete(id: string) {
    return this.http.delete<any>(this.BASE_URL + id);
  }
}
