export class Comment {
  id?: number;
  title: string = '';
  content: string = '';
  note: number = 10;
  created_at?: Date;
  updated_at?: Date;
  is_visible: boolean = true;
  film_id?: number;
  author?: {
    id: number;
    username: string;
    roles: string[];
  };

  constructor(data?: Partial<Comment>) {
    if (data) {
      Object.assign(this, data);
      //Conversion des types dates entre PHP et Javascript:
      if (data.created_at) this.created_at = new Date(data.created_at);
      if (data.updated_at) this.updated_at = new Date(data.updated_at);
    }
  }
}
