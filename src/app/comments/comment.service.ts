import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Comment} from '../../models/comment.model';

@Injectable({ providedIn: 'root' })
export class CommentService {
  private BASE_URL = 'http://localhost:8000/api/comment';

  constructor(private http: HttpClient) {}

  /**
   * Récuperation des commentaires à partir d'un film.
   * @param filmId Identifiant du film dont on récupère les commentaires.
   */
  getByFilmId(filmId: number): Observable<Comment[]> {
    return this.http.get<any[]>(this.BASE_URL + '?film=' + filmId).pipe(
      map(data => data.map(item => new Comment(item)))
    );
  }

  /**
   * Envoi du nouveau commentaire via l'API.
   * @param comment Nouveau commentaire
   */
  publish(commentData: any): Observable<any> {
    return this.http.post<any>(this.BASE_URL + '/publish', commentData);
  }

  // /**
  //  * Suppression du commentaire via l'API.
  //  * @param id Identifiant du commentaire à supprimer.
  //  */
  // delete(id: number): Observable<void> {
  // }
  //
  // /**
  //  * TODO
  //  * @param id
  //  */
  // report(id: number): Observable<void> {
  //
  // }
}
