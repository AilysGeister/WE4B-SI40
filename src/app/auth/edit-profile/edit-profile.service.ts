import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {

  private readonly BASE_URL: string = "http://localhost:8000/api/session/";

  constructor(
    private http: HttpClient
  ) {}

  updatePhoto(formData: FormData) {
    return this.http.post(this.BASE_URL + 'update-photo', formData)
  }

  updatePersonalDatas(body: any) {
    return this.http.put(this.BASE_URL + 'update-personal-datas', body);
  }

  updateEmail(body: any) {
    return this.http.put(this.BASE_URL + 'update-email', body);
  }

  updatePassword(body: any) {
    return this.http.put(this.BASE_URL + 'update-password', body);
  }
}
