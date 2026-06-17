import {User} from "./user.model";
import {Comment} from "./comment.model";

export class Report {
  id: number = -1;
  comment: Comment = new Comment();
  complainant: User = new User();
  created_at: Date = new Date();
  is_active: boolean = false;
  statut: string = "";
}
