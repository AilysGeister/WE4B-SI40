import {Component, Input, OnInit} from '@angular/core';
import {Film} from "../../../models/film.model";

@Component({
  selector: 'app-film-slider',
  templateUrl: './film-slider.component.html',
  styleUrls: ['./film-slider.component.css']
})
export class FilmSliderComponent implements OnInit {

  @Input() films!: Film[] | undefined;

  constructor() {}

  ngOnInit(): void {
  }
}
