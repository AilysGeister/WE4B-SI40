import { Component, OnInit } from '@angular/core';
import {ReportService} from "../report.service";
import {ReportListItem} from "../../../../models/reportListItem.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-last-reports',
  templateUrl: './last-reports.component.html',
  styleUrls: ['./last-reports.component.css']
})
export class LastReportsComponent implements OnInit {

  reports!: ReportListItem[];

  constructor(
    private reportService: ReportService,
    private router: Router,
  ) {}

  moderate(reportId: number) {
    this.router.navigate(['/','tools', 'report', reportId]);
  }

  ngOnInit(): void {
    this.reportService.getActive().subscribe({
      next: (data: ReportListItem[]) => {
        this.reports = data;
      }
    });
  }
}
