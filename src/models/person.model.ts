import {Film} from "./film.model";

export class Person {
  public id: number = -1;
  public firstname: string = "";
  public lastname: string = "";
  public birthdate?: Date;
  public photo: string = "";
  public directedFilms?: Film[];
  public playedFilms?: Film[];

  constructor(data?: Partial<Person>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  public getFullname(): string {
    return this.firstname + " " + this.lastname;
  }
}
