import {Film} from "./film.model";

export class PinedFilm {
  id: number = -1;
  film: Film = new Film();
  position: number = -1;

  constructor(id: number, film: Film, position: number = -1) {
    this.id = id;
    this.film = film;
    this.position = position;
  }
}
