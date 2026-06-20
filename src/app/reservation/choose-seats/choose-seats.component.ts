import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, of, Subscription } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { FilmService } from '../../film/film.service';
import { LoginService } from '../../auth/login/login.service';
import { User } from '../../../models/user.model';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'app-choose-seats',
  templateUrl: './choose-seats.component.html',
  styleUrls: ['./choose-seats.component.css']
})
export class ChooseSeatsComponent implements OnInit, OnDestroy {

  readonly seatsPerRow = 5;
  readonly firstClassMultiplier = 1.5;

  programmeId!: number;
  programme: any = null;
  film: any = null;
  room: any = null;
  seats: any[] = [];
  reservations: any[] = [];
  currentUserReservationId: number | null = null;
  reservedSeatsIds: Set<number> = new Set();
  selectedSeats: Set<number> = new Set();
  currentUser: User | null = null;

  firstClassCount = 0;
  secondClassCount = 0;
  filmPrice = 0;
  firstClassTotal = 0;
  secondClassTotal = 0;
  totalPrice = 0;

  loading = true;
  error: string | null = null;
  private subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reservationService: ReservationService,
    private loginService: LoginService,
    private filmService: FilmService
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.loginService.currentUser$.subscribe(user => {
        this.currentUser = user;
        if (this.seats.length > 0) {
          this.syncSeatState(this.reservations);
        }
      })
    );

    this.subscriptions.add(
      this.route.paramMap.subscribe(params => {
        this.programmeId = Number(params.get('programmeId'));
        this.loadData();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadData(): void {
    if (!this.programmeId || Number.isNaN(this.programmeId)) {
      this.handleError('Identifiant de programme invalide.', null);
      return;
    }

    this.loading = true;
    this.error = null;

    this.reservationService.getProgramme(this.programmeId).pipe(
      switchMap(programme => {
        this.programme = programme;
        const filmSlug = this.getProgrammeFilmSlug(programme);
        const roomId = Number(programme?.room?.id ?? programme?.room);
        if (!roomId || Number.isNaN(roomId)) {
          throw new Error('La salle associée au programme est introuvable.');
        }

        if (!filmSlug) {
          throw new Error('Le slug du film associé au programme est introuvable.');
        }

        this.room = programme.room ?? null;

        return forkJoin({
          film: this.filmService.getFilmBySlug(filmSlug),
          seatsResponse: this.reservationService.getRoomSeats(roomId),
          reservationsResponse: this.reservationService.getProgrammeReservations(this.programmeId)
        }).pipe(
          switchMap(({ film, seatsResponse, reservationsResponse }) => of({
            programme,
            film,
            seats: this.extractSeats(seatsResponse),
            reservations: this.extractReservations(reservationsResponse)
          }))
        );
      }),
      catchError((err) => {
        this.handleError('Erreur lors du chargement de la page de réservation.', err);
        return of(null);
      })
    ).subscribe(result => {
      if (!result) {
        return;
      }

      const { programme, film, seats, reservations } = result as { programme: any; film: any; seats: any[]; reservations: any[] };
      this.programme = programme;
      this.film = film;
      this.filmPrice = Number(film?.price ?? 0);
      this.seats = this.sortSeats(seats);
      this.reservations = reservations;
      this.syncSeatState(reservations);
      this.updatePrices();
      this.loading = false;
    });
  }

  toggleSeat(seat: any): void {
    if (this.isReserved(seat)) {
      return;
    }

    const seatId = seat.id;

    if (this.selectedSeats.has(seatId)) {
      this.selectedSeats.delete(seatId);
    } else {
      this.selectedSeats.add(seatId);
    }

    this.updatePrices();
  }

  isSeatSelected(seat: any): boolean {
    return this.selectedSeats.has(Number(seat.id));
  }

  isReserved(seat: any): boolean {
    return this.reservedSeatsIds.has(Number(seat.id));
  }

  getRowSeats(startIndex: number): any[] {
    return this.seats.slice(startIndex, startIndex + this.seatsPerRow);
  }

  getRowCount(): number {
    return Math.ceil(this.seats.length / this.seatsPerRow);
  }

  getRowIndexes(): number[] {
    return Array.from({ length: this.getRowCount() }, (_, index) => index);
  }

  updatePrices(): void {
    this.firstClassCount = 0;
    this.secondClassCount = 0;

    this.selectedSeats.forEach(seatId => {
      const seat = this.seats.find(s => s.id === seatId);
      if (seat) {
        if (Number(seat.class) === 1) {
          this.firstClassCount++;
        } else if (Number(seat.class) === 2) {
          this.secondClassCount++;
        }
      }
    });

    this.firstClassTotal = this.firstClassCount * this.filmPrice * this.firstClassMultiplier;
    this.secondClassTotal = this.secondClassCount * this.filmPrice;
    this.totalPrice = this.firstClassTotal + this.secondClassTotal;
  }

  submitReservation(): void {
    if (this.selectedSeats.size === 0) {
      this.error = 'Veuillez sélectionner au moins un siège.';
      return;
    }

    const currentUser = this.currentUser;

    if (!currentUser) {
      this.error = 'Vous devez être connecté pour réserver.';
      return;
    }

    const seatIds = Array.from(this.selectedSeats);
    const updatePayload = { seatIds };

    this.currentUserReservationId = this.findCurrentUserReservationId(this.reservations);

    const request$ = this.currentUserReservationId !== null
      ? this.reservationService.updateReservation(this.currentUserReservationId, updatePayload)
      : this.reservationService.getBasket().pipe(
        switchMap((basket) => this.reservationService.createReservation({
          programmeId: this.programme?.id ?? this.programmeId,
          seatIds,
          userId: currentUser.id,
          basket: basket?.id ?? null
        }))
      );

    request$.subscribe({
      next: () => {
        this.error = null;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.handleError('Erreur lors de l’enregistrement de la réservation', err);
      }
    });
  }

  handleError(message: string, err: any): void {
    console.error(message, err);
    this.error = message;
    this.loading = false;
  }

  getFormattedDate(): string {
    if (this.programme?.date) {
      return new Date(this.programme.date).toLocaleDateString('fr-FR');
    }
    return '';
  }

  getFormattedTime(): string {
    if (this.programme?.date) {
      return new Date(this.programme.date).toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    return '';
  }

  getSeatLabel(seat: any): string {
    return String(seat?.number ?? seat?.seatNumber ?? seat?.id ?? '');
  }

  getSeatClassName(seat: any): string {
    if (this.isReserved(seat)) {
      return 'reserved';
    }

    if (this.isSeatSelected(seat)) {
      return 'selected';
    }

    return 'available';
  }

  private getProgrammeFilmSlug(programme: any): string | null {
    const candidate = programme?.film?.slug ?? programme?.filmSlug ?? programme?.film_slug ?? programme?.slug;
    const slug = typeof candidate === 'string' ? candidate.trim() : '';
    return slug.length > 0 ? slug : null;
  }

  getSeatTone(seat: any): string {
    return Number(seat?.class) === 1 ? 'first-class' : 'second-class';
  }

  trackBySeatId(_: number, seat: any): number {
    return Number(seat?.id);
  }

  private extractSeats(response: any): any[] {
    if (Array.isArray(response)) {
      return response;
    }

    if (Array.isArray(response?.seats)) {
      return response.seats;
    }

    if (Array.isArray(response?.data)) {
      return response.data;
    }

    return [];
  }

  private normalizeSeatId(value: any): number | null {
    const seatId = Number(value?.id ?? value?.seat?.id ?? value?.seatId ?? value?.seat?.seatId ?? value);
    return Number.isFinite(seatId) ? seatId : null;
  }

  private extractReservations(response: any): any[] {
    if (Array.isArray(response)) {
      return response;
    }

    if (Array.isArray(response?.reservations)) {
      return response.reservations;
    }

    if (Array.isArray(response?.data)) {
      return response.data;
    }

    return [];
  }

  private getReservationSeatIds(reservation: any): number[] {
    const seats = reservation?.seats ?? reservation?.seatList ?? reservation?.seatIds ?? [];

    if (Array.isArray(seats)) {
      return seats
        .map((seat: any) => this.normalizeSeatId(seat))
        .filter((seatId: number | null): seatId is number => seatId !== null);
    }

    const singleSeatId = this.normalizeSeatId(seats);
    return singleSeatId === null ? [] : [singleSeatId];
  }

  private getReservationUserId(reservation: any): number | null {
    const candidate = reservation?.user?.id ?? reservation?.userId ?? reservation?.user;
    const userId = Number(candidate);
    return Number.isFinite(userId) ? userId : null;
  }

  private getReservationId(reservation: any): number | null {
    const candidate = reservation?.reservationId ?? reservation?.id;
    const reservationId = Number(candidate);
    return Number.isFinite(reservationId) ? reservationId : null;
  }

  private syncSeatState(reservations: any[]): void {
    const currentUserId = this.currentUser?.id !== undefined ? Number(this.currentUser.id) : null;
    const selectedIds = new Set<number>();
    const reservedIds = new Set<number>();

    this.currentUserReservationId = this.findCurrentUserReservationId(reservations);

    for (const reservation of reservations) {
      const reservationUserId = this.getReservationUserId(reservation);
      const seatIds = this.getReservationSeatIds(reservation);

      if (currentUserId !== null && reservationUserId === currentUserId) {
        for (const seatId of seatIds) {
          selectedIds.add(seatId);
        }
        continue;
      }

      for (const seatId of seatIds) {
        reservedIds.add(seatId);
      }
    }

    this.selectedSeats = selectedIds;
    this.reservedSeatsIds = reservedIds;

    if (currentUserId !== null) {
      for (const seat of this.seats) {
        const seatId = Number(seat?.id);
        if (this.selectedSeats.has(seatId)) {
          this.reservedSeatsIds.delete(seatId);
        }
      }
    }
  }

  private findCurrentUserReservation(reservations: any[]): any | null {
    const currentUserId = this.currentUser?.id !== undefined ? Number(this.currentUser.id) : null;

    if (currentUserId === null) {
      return null;
    }

    return reservations.find(reservation => this.getReservationUserId(reservation) === currentUserId) ?? null;
  }

  private findCurrentUserReservationId(reservations: any[]): number | null {
    const currentUserId = this.currentUser?.id !== undefined ? Number(this.currentUser.id) : null;

    if (currentUserId === null) {
      return null;
    }

    const reservation = reservations.find(item => this.getReservationUserId(item) === currentUserId) ?? null;
    return reservation ? this.getReservationId(reservation) : null;
  }

  private sortSeats(seats: any[]): any[] {
    return [...seats].sort((a, b) => {
      const rowA = Number(a?.row ?? a?.range ?? 0);
      const rowB = Number(b?.row ?? b?.range ?? 0);

      if (rowA !== rowB) {
        return rowA - rowB;
      }

      return Number(a?.number ?? a?.seatNumber ?? a?.id ?? 0) - Number(b?.number ?? b?.seatNumber ?? b?.id ?? 0);
    });
  }
}
