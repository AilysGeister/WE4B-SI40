import {User} from "./user.model";
import {Film} from "./film.model";

export class Comment {
  id: number = -1;
  title: string = '';
  content: string = '';
  note: number = 10;
  created_at: Date = new Date();
  updated_at: Date = new Date();
  is_visible: boolean = true;
  film: Film = new Film();
  author: User =  new User();

  constructor(data?: Partial<Comment>) {
    if (data) {
      Object.assign(this, data);
      //Conversion des types dates entre PHP et Javascript:
      if (data.created_at) this.created_at = new Date(data.created_at);
      if (data.updated_at) this.updated_at = new Date(data.updated_at);
    }
  }
}
