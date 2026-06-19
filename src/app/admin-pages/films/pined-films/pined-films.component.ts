import { Component, OnInit } from '@angular/core';
import {FilmService} from "../../../film/film.service";
import {PinedFilm} from "../../../../models/pinedFilm.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FilmResult} from "../../../../models/filmResult.model";

@Component({
  selector: 'app-pined-films',
  templateUrl: './pined-films.component.html',
  styleUrls: ['./pined-films.component.css']
})
export class PinedFilmsComponent implements OnInit {

  films: PinedFilm[] = [];
  newItemForm!: FormGroup;
  message: String ="";
  messageType: String ="";

  constructor(
    private filmService: FilmService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.newItemForm = this.fb.group({
      position: [1, [Validators.required, Validators.min(1)]],
      film: [null, Validators.required]
    });

    this.filmService.getPinedFilms().subscribe({
      next: (data: PinedFilm[]) => {
        this.films = data;
        this.films.sort((a, b) => a.position - b.position);
      }
    })
  }

  onSubmit() {
    if (this.newItemForm.valid) {
      const data = this.newItemForm.value;
      this.newItemForm.reset();
      let newItem = new PinedFilm(this.films.length + 1, data.film, data.position);
      this.films.splice(newItem.position-1,0, newItem);
      this.fixPosition();
    }
  }

  onGetFilm(film: FilmResult | null): void {
    this.newItemForm.patchValue({
      film: film
    });
  }

  up(item: PinedFilm) {
    const itemPrecedent = this.films.find(i => i.position === item.position - 1);
    if (itemPrecedent) {
      item.position--;
      itemPrecedent.position++;
      this.films.sort((a, b) => a.position - b.position);
    }
  }

  down(item: PinedFilm) {
    const itemSuivant = this.films.find(i => i.position === item.position + 1);
    if (itemSuivant) {
      item.position++;
      itemSuivant.position--;
      this.films.sort((a, b) => a.position - b.position);
      this.fixPosition();
    }
  }

  delete(target: PinedFilm) {
    this.films = this.films.filter(film => film.id !== target.id);
    this.films.sort((a, b) => a.position - b.position);
  }

  save() {
    this.filmService.setPinedFilms(this.films).subscribe({
      next: (response: any) => {
        this.newItemForm.reset();
        this.message = response.success || "Les films épinglés ont bien été mis à jour.";
        this.messageType = "success";
      },
      error: (response: any) => {
        this.newItemForm.reset();
        this.message = response.error?.error || "Une erreur est survenue lors de l'enregistrement.";
        this.messageType = "danger";
        console.log(response.details);
      }
    })
  }

  private fixPosition() {
    this.films.forEach((film, index) => {
      film.position = index +1;
    });
  }
}
