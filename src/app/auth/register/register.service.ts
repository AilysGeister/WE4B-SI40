import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  URL: string = "http://localhost:8000/api/session/register";

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Enregistre l'utilisateur auprés de l'API.
   * @param formData
   */
  register(formData: FormData): Observable<any> {
    return this.http.post<any>(this.URL, formData);
  }
}
