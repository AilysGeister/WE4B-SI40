import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Person} from "../../models/person.model";

@Injectable({
  providedIn: 'root'
})
export class PersonalityService {

  BASE_URL = 'http://localhost:8000/api/personality/';

  constructor(
    private http: HttpClient,
  ) {}

  getAllPersonalities() {
    return this.http.get<Person[]>(this.BASE_URL);
  }

  public getById(id: string): Observable<Person> {
    return this.http.get<Person>(this.BASE_URL + id);
  }

  public create(formData: FormData) {
    return this.http.post(this.BASE_URL + 'create', formData);
  }

  public update(id: string, formData: FormData) {
    return this.http.post(this.BASE_URL + id, formData);
  }

  public delete(id: string) {
    return this.http.delete(this.BASE_URL + id);
  }
}
