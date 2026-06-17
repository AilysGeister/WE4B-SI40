import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Person} from "../../models/person.model";

@Injectable({
  providedIn: 'root'
})
export class PersonalityService {

  BASE_URL = 'http://localhost:8000/api/personality';

  constructor(
    private http: HttpClient,
  ) {}

  public getById(id: string): Observable<Person> {
    return this.http.get<Person>(this.BASE_URL + '/' + id);
  }
}
