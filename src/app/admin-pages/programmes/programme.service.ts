import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Programme} from "../../../models/programme.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProgrammeService {

  BASE_URL = "http://localhost:8000/api/programme/";

  constructor(
    private http: HttpClient
  ) {}

  public create(formData: FormData) {
    return this.http.post(this.BASE_URL + 'create', formData);
  }

  public getAll(): Observable<Programme[]> {
    return this.http.get<Programme[]>(this.BASE_URL);
  }

  public getById(id: string): Observable<Programme> {
    return this.http.get<Programme>(this.BASE_URL + id);
  }

  public update(id: string, data: FormData) {
    return this.http.put(this.BASE_URL + id, data);
  }

  public delete(id: string) {
    return this.http.delete(this.BASE_URL + id);
  }
}
