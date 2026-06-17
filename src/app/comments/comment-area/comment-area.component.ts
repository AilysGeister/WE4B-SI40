import {Component, Input, OnInit} from '@angular/core';
import {Comment} from '../../../models/comment.model';
import {Observable} from "rxjs";
import {User} from "../../../models/user.model";
import {LoginService} from '../../auth/login/login.service';

@Component({
  selector: 'app-comment-area',
  templateUrl: './comment-area.component.html'
})
export class CommentAreaComponent implements OnInit {
  //Paramètres du composant:
  @Input() comments: Comment[] = [];
  @Input() filmId!: number;

  currentUser$: Observable<User | null> = this.loginService.currentUser$;

  constructor(
    private loginService: LoginService,
  ) {}

  ngOnInit(): void {
    //On range les commentaires afin d'avoir les plus récents d'abords:
    this.comments.sort((a, b) => {
      const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return timeB - timeA;
    });
  }

  onCommentCreated(newComment: Comment): void {
    this.comments.unshift(newComment);
  }

  onCommentDeleted(deletedId: number): void {
    this.comments = this.comments.filter(c => c.id !== deletedId);
  }
}
