import { Component, OnInit } from '@angular/core';
import {Comment} from 'src/models/comment.model'
import {Report} from "../../../models/report.model";
import {CommentService} from "../../comments/comment.service";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  //Filtres:
  selectedSort: string = 'ID-ASC';
  selectedStatut: string = 'false';

  //Commentaires
  allComments: Comment[] = [];
  visibleComments: Comment[] = [];

  constructor(
    private commentService: CommentService,
  ) { }

  ngOnInit(): void {
    this.commentService.getAll().subscribe({
      next: (data: Comment[]) => {
        this.allComments = data;
        this.visibleComments = this.allComments.filter((comment: Comment) => comment.is_visible === true);
      }
    });
  }

  onFilterChange() {
    //Initialisation:
    let sortType: String = "ID";
    let sortOrder: String = "ASC";

    //Statut:
    let tempComments = this.allComments;
    if (this.selectedStatut !== 'Tous') {
      tempComments = tempComments.filter(comment => comment.is_visible === Boolean(this.selectedStatut));
    }

    //Type dde tri:
    if (this.selectedSort.includes('ID')) {
      sortType = "ID";
    } else if (this.selectedSort.includes('DATE')) {
      sortType = "DATE";
    } else if (this.selectedSort.includes('ALPHA')) {
      sortType = "ALPHA";
    }

    //Ordre:
    tempComments.sort((a, b) => {
      switch (this.selectedSort) {
        case 'ID-ASC':
          return a.id - b.id;
        case 'ID-DESC':
          return b.id - a.id;
        case 'DATE-ASC':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'DATE-DESC':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'ALPHA-ASC':
          const titreA = a?.title || '';
          const titreB = b?.title || '';
          return titreA.localeCompare(titreB);
        case 'ALPHA-DESC':
          const tA = a?.title || '';
          const tB = b?.title || '';
          return tB.localeCompare(tA);
        default:
          return 0;
      }
    });

    this.visibleComments = tempComments;
  }
}
