import {Genre} from "src/models/Genre";
import {Person} from "src/models/person.model";
import {Comment} from "src/models/comment.model";

export class Film {
  id: number = -1;
  title: string = "";
  description?: string;
  slug: string = "";
  duration?: number;
  coverPath?: string;
  price?: number;
  genres?: Genre[];
  actors?: Person[];
  directors?: Person[];
  visibleComments: Comment[] = [];

  constructor(data?: Partial<Film>) {
    if (data) {
      Object.assign(this, data);
      if (data.price) this.price = Number(data.price);
      if (data.genres) this.genres = data.genres.map(g => new Genre(g.id, g.name));
      if (data.actors) this.actors = data.actors.map(a => new Person(a));
      if (data.directors) this.directors = data.directors.map(d => new Person(d));
      if (data.visibleComments) this.visibleComments = data.visibleComments.map(c => new Comment(c));
    }
  }

  /**
   * Retourne la durée du film sous la forme HhM.
   */
  public getFormatedDuration(): String {
    if (!this.duration || this.duration <= 0) {
      return "0h0";
    } else {
      let minutes = this.duration % 60;
      let hours = Math.floor(this.duration / 60);
      return hours + 'h' + minutes;
    }
  }
}
