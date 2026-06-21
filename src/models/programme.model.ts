import {Room} from "./room.model";
import {Film} from "./film.model";
import {Lang} from "./lang.model";
import {Reservation} from "./reservation.model";

export class Programme {
  id: number = -1;
  date: Date = new Date();
  end: Date = new Date();
  room!: Room;
  film!: Film;
  lang!: Lang;
  reservations!: Reservation;
}
