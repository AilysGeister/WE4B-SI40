import { Component, OnInit } from '@angular/core';
import {Comment} from 'src/models/comment.model'
import {CommentService} from "../../../comments/comment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Report} from "../../../../models/report.model";
import {ReportService} from "../report.service";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  comment: Comment = new Comment();
  reports: Report[] = [new Report()];

  constructor(
    private commentService: CommentService,
    private reportService: ReportService,
    private route : ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const commentId = params.get('id');
      if (commentId) {
        this.commentService.getById(commentId).subscribe({
          next: (data: Comment) => {
            this.comment = data;
          }
        });

        this.reportService.getByCommentId(commentId).subscribe({
          next: (data: Report[]) => {
            this.reports = data;
          }
        })
      }
    });
  }

  delete() {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce commentaire ?")) {
      this.reportService.acceptReport(this.comment.id).subscribe()
      this.router.navigate(['/tools/reports/active'])
    }
  }

  refuse() {
    this.reportService.refuseReport(this.comment.id).subscribe()
    this.router.navigate(['/tools/reports/active'])
  }
}
