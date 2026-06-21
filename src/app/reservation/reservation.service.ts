import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { LoginService } from "../auth/login/login.service";
import { map, switchMap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private BASE_URL = "http://localhost:8000/api";

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) { }

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
    const currentUser = this.loginService.getCurrentUserValue();

    if (!currentUser?.id) {
      return throwError(() => new Error('Utilisateur non connecté'));
    }

    return this.http.get<any>(`${this.BASE_URL}/basket`).pipe(
      map((response) => this.findActiveBasketForUser(response, Number(currentUser.id))),
      switchMap((basket) => basket ? of(basket) : this.createBasket(Number(currentUser.id)))
    );
  }

  createBasket(userId: number): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/basket/create`, { userId });
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

  payBasket(basketId: number): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/basket/pay/${basketId}`, {});
  }

  //PANIER

  getViewedFilms(userId: String | Number) {
    return this.http.get<any>(this.BASE_URL + '/basket/user/' + userId);
  }

  private findActiveBasketForUser(response: any, userId: number): any | null {
    const baskets = this.extractBasketCollection(response);

    return baskets.find((basket) => {
      const basketUserId = Number(basket?.user?.id ?? basket?.userId ?? basket?.user);
      return basketUserId === userId && basket?.isActive === true;
    }) ?? null;
  }

  private extractBasketCollection(response: any): any[] {
    if (Array.isArray(response)) {
      return response;
    }

    if (Array.isArray(response?.baskets)) {
      return response.baskets;
    }

    if (Array.isArray(response?.data)) {
      return response.data;
    }

    if (response && typeof response === 'object') {
      return [response];
    }

    return [];
  }
}
