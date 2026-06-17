import { Component, OnInit } from '@angular/core';
import {Report} from "../../../../models/report.model";
import {ReportService} from "../report.service";

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.css']
})
export class ReportsListComponent implements OnInit {
  //Filtres:
  selectedStatut: string = 'Tous';
  selectedSort: string = 'ID-ASC';

  //Signalements:
  allReports: Report[] = [];
  visibleReports: Report[] = [];

  constructor(
    private reportService: ReportService,
  ) {}

  ngOnInit(): void {
    this.reportService.getAll().subscribe({
      next: (data: Report[]) => {
        this.allReports = data;
        this.visibleReports = data;
      }
    });
  }

  onFilterChange() {
    //Initialisation:
    let sortType: String = "ID";
    let sortOrder: String = "ASC";

    //Statut:
    let tempReports = this.allReports;
    if (this.selectedStatut !== 'Tous') {
      tempReports = tempReports.filter(r => r.statut === this.selectedStatut);
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
    tempReports.sort((a, b) => {
      switch (this.selectedSort) {
        case 'ID-ASC':
          return a.id - b.id;
        case 'ID-DESC':
          return b.id - a.id;
        case 'ALPHA-ASC':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'ALPHA-DESC':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'DATE-ASC':
          const titreA = a.comment?.title || '';
          const titreB = b.comment?.title || '';
          return titreA.localeCompare(titreB);
        case 'DATE-DESC':
          const tA = a.comment?.title || '';
          const tB = b.comment?.title || '';
          return tB.localeCompare(tA);
        default:
          return 0;
      }
    });

    this.visibleReports = tempReports;
  }
}
