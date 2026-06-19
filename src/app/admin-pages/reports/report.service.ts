import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Report} from "../../../models/report.model";
import {ReportListItem} from "../../../models/reportListItem.model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  BASE_URL = "http://localhost:8000/api/comment/";

  constructor(
    private http: HttpClient,
  ) {}

  getActive() {
    return this.http.get<ReportListItem[]>(this.BASE_URL +'reports/active');
  }

  getAll(statut: string = "Tous"): Observable<Report[]> {
    return this.http.get<Report[]>(this.BASE_URL + 'reports/').pipe(
      map((reports: Report[]) => {
        if (statut === "Tous") {
          return reports;
        }
        return reports.filter(report => report.statut === statut);
      })
    );
  }

  getByCommentId(commentId: string) {
    return this.http.get<Report[]>(this.BASE_URL +'reports/'+commentId);
  }

  acceptReport(reportId: number) {
    return this.http.post<any>(this.BASE_URL + reportId + '/report/accept', null);
  }

  refuseReport(reportId: number) {
    return this.http.post<any>(this.BASE_URL + reportId + '/report/refuse', null);
  }
}
