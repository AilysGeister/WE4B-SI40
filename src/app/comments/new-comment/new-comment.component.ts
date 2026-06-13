import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Comment} from '../../../models/comment.model';
import {CommentService} from '../comment.service';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent {
  @Input() filmId!: number;
  @Output() created = new EventEmitter<Comment>();

  newComment: Comment = new Comment();
  formComment!: FormGroup;
  message: string = "";

  constructor(
    private commentService: CommentService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.formComment = this.formBuilder.group({
      title: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(64)]),
      content: new FormControl(null, [Validators.required, Validators.minLength(64), Validators.maxLength(500)]),
      note: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(20)]),
    })
  }

  /**
   * Créer le nouveau commentaire et vide le formulaire de création.
   */
  onSubmit(): void {
    //Tant que les champs ne sont pas correct il est impossible de valider le formulaire:
    if (this.formComment.invalid) {
      return;
    }

    //Récuperation des champs du formulaire pour l'API:
    const commentPayload = {
      title: this.formComment.value.title,
      content: this.formComment.value.content,
      note: this.formComment.value.note,
      film_id: this.filmId
    };

    this.commentService.publish(commentPayload).subscribe({
      next: (comment) => {
        this.created.emit(comment);
        this.formComment.reset();
        this.message = "Commentaire publié avec succès !";
      },
      error: (err) => {
        this.message = err.error?.message || "Une erreur est survenue.";
      }
    });
  }
}
