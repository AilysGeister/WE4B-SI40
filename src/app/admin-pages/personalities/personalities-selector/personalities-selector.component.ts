import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Person} from "../../../../models/person.model";
import {PersonalityService} from "../../../personality/personality.service";

@Component({
  selector: 'app-personalities-selector',
  templateUrl: './personalities-selector.component.html',
  styleUrls: ['./personalities-selector.component.css']
})
export class PersonalitiesSelectorComponent implements OnInit {
  @Input() label: string = 'Rechercher des personnalités';
  @Input() placeholder: string = 'Tapez un nom...';

  @Input() set initialPeople(people: Person[] | undefined) {
    if (people) {
      this.selectedPersonalities = [...people];
      this.emitChanges();
    }
  }

  @Output() selectedPeopleIds = new EventEmitter<number[]>();

  allPeople: Person[] = [];
  filteredPersnolaities: Person[] = [];
  selectedPersonalities: Person[] = [];
  searchQuery: string = '';

  constructor(
    private personalityService: PersonalityService
  ) {}

  ngOnInit(): void {
    this.personalityService.getAllPersonalities().subscribe({
      next: (people) => this.allPeople = people,
      error: (err) => console.error('Erreur lors de la récupération des personnalités', err)
    });
  }

  onSearchChange(): void {
    if (!this.searchQuery.trim()) {
      this.filteredPersnolaities = [];
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.filteredPersnolaities = this.allPeople.filter(person => {
      const fullName = `${person.firstname} ${person.lastname}`.toLowerCase();
      return fullName.includes(query) && !this.isAlreadySelected(person);
    });
  }

  selectPersonality(person: Person): void {
    if (!this.isAlreadySelected(person)) {
      this.selectedPersonalities.push(person);
      this.searchQuery = '';
      this.filteredPersnolaities = [];
      this.emitChanges();
    }
  }

  removePersonality(person: Person): void {
    this.selectedPersonalities = this.selectedPersonalities.filter(p => p.id !== person.id);
    this.emitChanges();
  }

  private isAlreadySelected(person: Person): boolean {
    return this.selectedPersonalities.some(p => p.id === person.id);
  }

  private emitChanges(): void {
    const ids = this.selectedPersonalities.map(p => p.id);
    this.selectedPeopleIds.emit(ids);
  }
}
