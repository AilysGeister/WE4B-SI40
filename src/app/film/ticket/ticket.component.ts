import {Component, Input, OnInit} from '@angular/core';
import {ReservationService} from "../../reservation/reservation.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  ticket!: any;
  ticketId: any;

  constructor(
    private reservationService: ReservationService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userId = params.get('userId');
      this.ticketId = params.get('ticketId');
      if (userId && this.ticketId) {
        this.reservationService.getViewedFilms(userId).subscribe(data => {
          let temp = data;
          for (let i = 0; i < data.length; i++) {
            if (data[i].id == this.ticketId) {
              this.ticket = data[i];
              console.log(this.ticket);
            }
          }
        })
      }
    });
  }
}
