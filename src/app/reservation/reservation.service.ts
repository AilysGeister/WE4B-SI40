import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private BASE_URL = "http://localhost:8000/api";

  constructor(private http: HttpClient) { }

  getProgramme(id: number): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/programme/${id}`);
  }

  getRoom(id: number): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/room/${id}`);
  }

  getRoomSeats(idRoom: number): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/room/${idRoom}/seats`);
  }

  getProgrammeReservations(programmeId: number): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/programme/${programmeId}/reservations`);
  }

  /**
   * Crée une nouvelle réservation
   */
  createReservation(data: Record<string, unknown>): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/reservation/create`, data);
  }
}
