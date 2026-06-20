import { Component, OnInit } from '@angular/core';
import {Lang} from "../../../../models/lang.model";
import {LangService} from "../../langs/lang.service";
import {Room} from "../../../../models/room.model";
import {RoomService} from "../room.service";

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css']
})
export class RoomsListComponent implements OnInit {

  rooms: Room[] = [];

  constructor(
    private roomService: RoomService,
  ) {}

  ngOnInit(): void {
    this.roomService.getAll().subscribe({
      next: result => {
        this.rooms = result;
        this.rooms.sort((a, b) => a.id - b.id);
      }
    })
  }

  onDelete(id: number) {
    if (id && confirm("Êtes-vous sûr de vouloir supprimer cette salle ? (Cette action est irréversible !)")) {
      this.roomService.delete(id.toString()).subscribe({
        next: () => {
          this.rooms = this.rooms.filter(room => room.id !== id);
        },
        error: (err) => {
          alert("Une erreur est survenue lors de la suppression.");
        }
      });
    }
  }
}
