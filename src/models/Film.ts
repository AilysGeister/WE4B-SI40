import { Genre } from "src/models/Genre";
import { Person } from "src/models/Person";

export class Film {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public duration: number,
    public slug: string,
    public cover: string,
    public price: number,
    public genres: Genre[],
    public actors: Person[],
    public directors: Person[]
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.duration = duration;
    this.slug = slug;
    this.cover = cover;
    this.price = price;
    this.genres = genres;
    this.actors = actors;
    this.directors = directors;
  }
}
