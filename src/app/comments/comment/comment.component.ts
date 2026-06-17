import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Comment} from '../../../models/comment.model';
import {CommentService} from '../comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  @Input() comment!: Comment;
  @Input() currentUser: any;
  @Output() deleted = new EventEmitter<number>();

  constructor(
    private commentService: CommentService
  ) {}

  /**
   * Permet de savoir si l'utilisateur peut supprimer un commentaire.
   * I.E. Si il en est l'auteur ou qu'il est modérateur.
   */
  get canDelete(): boolean {
    if (!this.currentUser || !this.comment.author) return false;
    const isAuthor = this.currentUser.id === this.comment.author.id;
    const isMod = (this.currentUser.getHighestRole() === 'Administrateur' || this.currentUser.getHighestRole() === 'Modérateur');
    return isAuthor || isMod;
  }

  /**
   * Permet de savoir si l'utilisateur peut signaler un commentaire.
   * I.E. Si il est connecté et qu'il n'en est pas l'auteur.
   */
  get canReport(): boolean {
    if (!this.currentUser || !this.comment.author) return false;
    return this.currentUser.id !== this.comment.author.id;
  }

  /**
   * Suppression d'un commentaire.
   */
  onDelete(): void {
    if (confirm('Êtes vous sûr de vouloir supprimer ce commentaire (cette action est irréversible) ?') && this.comment.id) {
      this.commentService.delete(this.comment.id).subscribe(() => {
        this.deleted.emit(this.comment.id);
      });
    }
  }

  /**
   * Création d'un nouveau signalement
   */
  onReport(): void {
    if (confirm('Êtes vous sûr de vouloir signaler ce commentaire ?') && this.comment.id) {
      this.commentService.report(this.comment.id).subscribe(() => alert('Votre signalement à bien été pris en compte.'));
    }
  }
}
