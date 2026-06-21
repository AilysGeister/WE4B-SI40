import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Room} from "../../../models/room.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  BASE_URL = 'http://localhost:8000/api/room/';

  constructor(
    private http: HttpClient,
  ) {}

  public create(formData: FormData): Observable<any> {
    return this.http.post<Room>(this.BASE_URL + 'create', formData);
  }

  public getAll(): Observable<Room[]> {
    return this.http.get<Room[]>(this.BASE_URL);
  }

  public getById(id: string): Observable<Room> {
    return this.http.get<Room>(this.BASE_URL + id);
  }

  public update(id: string, formData: FormData): Observable<any> {
    return this.http.put<Room>(this.BASE_URL + id, formData);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete<Room>(this.BASE_URL + id);
  }
}
