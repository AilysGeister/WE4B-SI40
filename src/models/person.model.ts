import {Film} from "./film.model";

export class Person {
  public id: number = -1;
  public firstname: string = "";
  public lastname: string = "";
  public birthdate?: Date;
  public photo: string = "default.png";
  public directedFilms?: Film[];
  public playedFilms?: Film[];
  public created_at: Date= new Date();
  public updated_at: Date= new Date();

  constructor(data?: Partial<Person>) {
    if (data) {
      Object.assign(this, data);
      if (data.created_at) this.created_at = new Date(data.created_at);
      if (data.updated_at) this.created_at = new Date(data.updated_at);
    }
  }
}
