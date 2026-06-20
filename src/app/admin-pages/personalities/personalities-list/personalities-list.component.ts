import {Component, OnInit} from '@angular/core';
import {Person} from "../../../../models/person.model";
import {PersonalityService} from "../../../personality/personality.service";

@Component({
  selector: 'app-personalities-list',
  templateUrl: './personalities-list.component.html',
  styleUrls: ['./personalities-list.component.css']
})
export class PersonalitiesListComponent implements OnInit {

  personalities: Person[] = [];

  constructor(
    private personalityService: PersonalityService,
  ) {}

  ngOnInit(): void {
    this.personalityService.getAllPersonalities().subscribe({
      next: (data: Person[]) => {
        this.personalities = data;
        this.personalities.sort((a, b) => a.id - b.id);
      }
    })
  }

  onDelete(id: number) {
    if (id && confirm("Êtes-vous sûr de vouloir supprimer cette personnalité ? (Cette action est irréversible !)")) {
      this.personalityService.delete(id.toString()).subscribe({
        next: () => {
          this.personalities = this.personalities.filter(personality => personality.id !== id);
        },
        error: (err) => {
          alert("Une erreur est survenue lors de la suppression.");
        }
      });
    }
  }
}
