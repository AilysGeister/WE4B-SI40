import {Seat} from "./seat.model";

export class Reservation {
  id: number = -1;
  seats!: Seat[];
}
