import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable, of, Subscription } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { LoginService } from '../auth/login/login.service';
import { User } from '../../models/user.model';
import { FilmService } from '../film/film.service';
import { ReservationService } from '../reservation/reservation.service';

interface BasketReservationView {
  id: number;
  programme: any;
  seats: any[];
  firstClassCount: number;
  secondClassCount: number;
  firstClassUnitPrice: number;
  secondClassUnitPrice: number;
  firstClassTotal: number;
  secondClassTotal: number;
  total: number;
}

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit, OnDestroy {
  readonly quantityOptions = Array.from({ length: 10 }, (_, index) => index);
  readonly firstClassMultiplier = 1.5;
  readonly coverBaseUrl = 'http://localhost:8000/resources/images/films_cover/';

  currentUser: User | null = null;
  basket: any = null;
  reservations: BasketReservationView[] = [];
  firstClassSelections: Record<number, number> = {};
  secondClassSelections: Record<number, number> = {};

  loading = true;
  error: string | null = null;
  successMessage: string | null = null;
  showPayDialog = false;
  private subscriptions = new Subscription();

  constructor(
    private loginService: LoginService,
    private filmService: FilmService,
    private reservationService: ReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.loginService.currentUser$.subscribe((user) => {
        this.currentUser = user;
        if (user) {
          this.loadBasket();
        } else {
          this.loading = false;
          this.error = 'Vous devez être connecté pour accéder au panier.';
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadBasket(): void {
    this.loading = true;
    this.error = null;

    this.reservationService.getBasket().pipe(
      switchMap((basket) => this.loadReservationDetails(basket))
    ).subscribe({
      next: ({ basket, reservations }) => {
        this.basket = basket;
        this.reservations = reservations;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement du panier', err);
        this.error = 'Impossible de charger votre panier.';
        this.loading = false;
      }
    });
  }

  onFirstClassChange(reservation: BasketReservationView, value: number): void {
    this.firstClassSelections[reservation.id] = Number(value);
    this.redirectToChooseSeats(reservation);
  }

  onSecondClassChange(reservation: BasketReservationView, value: number): void {
    this.secondClassSelections[reservation.id] = Number(value);
    this.redirectToChooseSeats(reservation);
  }

  private redirectToChooseSeats(reservation: BasketReservationView): void {
    const programmeId = Number(reservation?.programme?.id);

    if (!Number.isFinite(programmeId)) {
      this.error = 'Impossible de retrouver le programme pour modifier les places.';
      return;
    }

    this.router.navigate(['/reservation/choose-seats', programmeId]);
  }

  deleteReservation(reservationId: number): void {
    const confirmed = window.confirm('Supprimer cette réservation du panier ?');
    if (!confirmed) {
      return;
    }

    this.reservationService.deleteReservation(reservationId).subscribe({
      next: () => {
        this.loadBasket();
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de la réservation', err);
        this.error = 'Impossible de supprimer cette réservation.';
      }
    });
  }

  openPayDialog(): void {
    this.showPayDialog = true;
  }

  closePayDialog(): void {
    this.showPayDialog = false;
  }

  payBasket(): void {
    const basketId = Number(this.basket?.id);

    if (!Number.isFinite(basketId)) {
      this.error = 'Impossible de retrouver le panier à payer.';
      return;
    }

    this.reservationService.payBasket(basketId).subscribe({
      next: () => {
        this.showPayDialog = false;
        this.successMessage = 'Votre panier a bien été payé.';
        this.loadBasket();
      },
      error: (err) => {
        console.error('Erreur lors du paiement du panier', err);
        this.error = 'Impossible de payer votre panier.';
      }
    });
  }

  getTotalBasket(): number {
    return this.reservations.reduce((total, reservation) => total + reservation.total, 0);
  }

  getReservationDate(reservation: any): string {
    const date = reservation?.programme?.date;
    if (!date) {
      return '';
    }

    return new Date(date).toLocaleDateString('fr-FR');
  }

  getReservationTimeRange(reservation: any): string {
    const date = reservation?.programme?.date;
    const duration = Number(reservation?.programme?.film?.duration ?? 0);

    if (!date) {
      return '';
    }

    const start = new Date(date);
    const end = new Date(start.getTime() + duration * 60000);

    const startHours = start.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    const endHours = end.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

    return `${startHours} - ${endHours}`;
  }

  getFilmCoverUrl(reservation: any): string | null {
    const coverPath = reservation?.programme?.film?.coverPath;
    if (!coverPath) {
      return null;
    }

    return `${this.coverBaseUrl}${coverPath}`;
  }

  trackByReservationId(_: number, reservation: BasketReservationView): number {
    return Number(reservation.id);
  }

  private loadReservationDetails(basket: any): Observable<{ basket: any; reservations: BasketReservationView[] }> {
    const rawReservations = Array.isArray(basket?.reservations) ? basket.reservations : [];
    const reservationIds = rawReservations
      .map((reservation: any) => Number(reservation?.id ?? reservation?.reservationId ?? reservation))
      .filter((reservationId: number) => Number.isFinite(reservationId));

    if (reservationIds.length === 0) {
      return of({ basket, reservations: [] });
    }

    const reservationRequests: Observable<any>[] = reservationIds.map((reservationId: number) =>
      this.reservationService.getReservation(reservationId).pipe(
        switchMap((reservation) => this.enrichReservationWithProgrammeAndFilm(reservation))
      )
    );

    return forkJoin(reservationRequests).pipe(
      map((reservations: any[]) => ({
        basket,
        reservations: this.normalizeReservations(reservations)
      }))
    );
  }

  private normalizeReservations(reservations: any[]): BasketReservationView[] {
    return reservations.map((reservation) => {
      const seats = Array.isArray(reservation?.seats) ? reservation.seats : [];
      const firstClassCount = seats.filter((seat: any) => Number(seat?.class) === 1).length;
      const secondClassCount = seats.filter((seat: any) => Number(seat?.class) === 2).length;
      const filmPrice = Number(reservation?.programme?.film?.price ?? 0);
      const firstClassUnitPrice = filmPrice * this.firstClassMultiplier;
      const secondClassUnitPrice = filmPrice;
      const firstClassTotal = firstClassCount * firstClassUnitPrice;
      const secondClassTotal = secondClassCount * secondClassUnitPrice;
      const id = Number(reservation?.id ?? reservation?.reservationId);

      if (Number.isFinite(id)) {
        this.firstClassSelections[id] = firstClassCount;
        this.secondClassSelections[id] = secondClassCount;
      }

      return {
        id,
        programme: reservation?.programme ?? null,
        seats,
        firstClassCount,
        secondClassCount,
        firstClassUnitPrice,
        secondClassUnitPrice,
        firstClassTotal,
        secondClassTotal,
        total: firstClassTotal + secondClassTotal
      };
    });
  }

  private enrichReservationWithProgrammeAndFilm(reservation: any): Observable<any> {
    const programmeId = Number(reservation?.programme?.id ?? reservation?.programmeId ?? reservation?.programme_id);

    if (!Number.isFinite(programmeId)) {
      return of(reservation);
    }

    return this.reservationService.getProgramme(programmeId).pipe(
      switchMap((programme) => {
        const filmSlug = this.getProgrammeFilmSlug(programme);

        if (!filmSlug) {
          return of({
            ...reservation,
            programme
          });
        }

        return this.filmService.getFilmBySlug(filmSlug).pipe(
          map((film) => ({
            ...reservation,
            programme: {
              ...(programme ?? {}),
              film: {
                ...(programme?.film ?? {}),
                ...film
              }
            }
          })),
          catchError((err) => {
            console.error('Erreur lors du chargement du film de la réservation', err);
            return of({
              ...reservation,
              programme
            });
          })
        );
      }),
      catchError((err) => {
        console.error('Erreur lors du chargement du programme de la réservation', err);
        return of(reservation);
      })
    );
  }

  private getProgrammeFilmSlug(programme: any): string | null {
    const candidate = programme?.film?.slug ?? programme?.filmSlug ?? programme?.film_slug ?? programme?.slug;
    const slug = typeof candidate === 'string' ? candidate.trim() : '';

    return slug.length > 0 ? slug : null;
  }

}
