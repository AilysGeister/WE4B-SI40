import { Component, OnInit } from '@angular/core';
import {Lang} from "../../../../models/lang.model";
import {LangService} from "../lang.service";

@Component({
  selector: 'app-langs-list',
  templateUrl: './langs-list.component.html',
  styleUrls: ['./langs-list.component.css']
})
export class LangsListComponent implements OnInit {

  langs: Lang[] = [];

  constructor(
    private langService: LangService,
  ) {}

  ngOnInit(): void {
    this.langService.getAll().subscribe({
      next: lang => {
        this.langs = lang;
        this.langs.sort((a, b) => a.id - b.id);
      }
    })
  }

  onDelete(id: number) {
    if (id && confirm("Êtes-vous sûr de vouloir supprimer cette langue ? (Cette action est irréversible !)")) {
      this.langService.delete(id.toString()).subscribe({
        next: () => {
          this.langs = this.langs.filter(lang => lang.id !== id);
        },
        error: (err) => {
          alert("Une erreur est survenue lors de la suppression.");
        }
      });
    }
  }
}
