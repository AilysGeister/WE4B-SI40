import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Comment} from '../../models/comment.model';
import {Film} from "../../models/film.model";
import {Report} from "../../models/report.model";

@Injectable({ providedIn: 'root' })
export class CommentService {
  private BASE_URL = 'http://localhost:8000/api/comment';

  constructor(private http: HttpClient) {}

  /**
   * Récuperation de tout les commentaires.
   * @param filmId Identifiant du film dont on récupère les commentaires.
   */
  getAll(is_visible: any = "Tous"): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.BASE_URL).pipe(
      map((comments: Comment[]) => {
        if (is_visible === "Tous") {
          return comments;
        }
        return comments.filter(comment => comment.is_visible === is_visible);
      })
    );
  }

  /**
   * Récuperation d'un commentaire à partir de son identifiant.
   * @param commentId Identifiant du commentaire à récupérer.
   */
  getById(commentId: string): Observable<Comment> {
    return this.http.get<any[]>(this.BASE_URL + '/' + commentId).pipe(
      map((parseJson: any) => {
        if (Array.isArray(parseJson) && parseJson.length > 0) {
          return new Comment(parseJson[0]);
        }
        return new Comment(parseJson);
      })
    )
  }

  /**
   * Envoi du nouveau commentaire via l'API.
   * @param comment Nouveau commentaire
   */
  publish(commentData: any): Observable<any> {
    return this.http.post<any>(this.BASE_URL + '/publish', commentData);
  }

  /**
  * Suppression du commentaire via l'API.
  * @param id Identifiant du commentaire à supprimer.
  */
   delete(id: number): Observable<void> {
     return this.http.delete<any>(this.BASE_URL + '/' + id);
  }

  /**
   * Signale un commentaire via l'API.
   * @param id Identifiant du commentaire à signaler.
   */
  report(id: number): Observable<void> {
    return this.http.post<any>(this.BASE_URL + '/' + id + '/report', null);
  }
}
