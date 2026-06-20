import { Component, OnInit } from '@angular/core';
import {Programme} from "../../../../models/programme.model";
import {ProgrammeService} from "../programme.service";

@Component({
  selector: 'app-programmes-list',
  templateUrl: './programme-list.component.html',
  styleUrls: ['./programme-list.component.css']
})
export class ProgrammeListComponent implements OnInit {

  programmes: Programme[] = [];

  constructor(
    private programmeService: ProgrammeService,
  ) { }

  ngOnInit(): void {
    this.programmeService.getAll().subscribe({
      next: (data: Programme[]) => {
        this.programmes = data;
        this.programmes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }
    })
  }

  onDelete(id: number) {
    if (id && confirm("Êtes-vous sûr de vouloir supprimer ce programme ? (Cette action est irréversible !)")) {
      this.programmeService.delete(id.toString()).subscribe({
        next: () => {
          this.programmes = this.programmes.filter(programme => programme.id !== id);
        },
        error: (err) => {
          alert("Une erreur est survenue lors de la suppression.");
        }
      });
    }
  }
}
