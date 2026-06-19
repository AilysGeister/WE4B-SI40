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

  getReservation(reservationId: number): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/reservation/${reservationId}`);
  }

  getBasket(): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/basket`);
  }

  createBasket(): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/basket/create`, {});
  }

  /**
   * Crée une nouvelle réservation
   */
  createReservation(data: Record<string, unknown>): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/reservation/create`, data);
  }

  updateReservation(reservationId: number, data: Record<string, unknown>): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/reservation/update/${reservationId}`, data);
  }

  updateBasketReservation(reservationId: number, data: Record<string, unknown>): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/reservation/update/${reservationId}`, data);
  }

  deleteReservation(reservationId: number): Observable<any> {
    return this.http.delete<any>(`${this.BASE_URL}/reservation/delete/${reservationId}`);
  }

  payBasket(): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/basket/pay`, {});
  }
}
