import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Film} from "../../../models/film.model";

@Component({
  selector: 'app-film-slider',
  templateUrl: './film-slider.component.html',
  styleUrls: ['./film-slider.component.css']
})
export class FilmSliderComponent implements OnInit {

  BASE_URL = "http://localhost:8000/resources/images/films_cover/";

  @Input() films!: Film[] | undefined;
  @ViewChild('carouselContainer', { static: false }) carouselContainer!: ElementRef<HTMLDivElement>;
  private scrollAmount: number = 400;

  constructor() {}

  ngOnInit(): void {
  }

  scrollLeft(): void {
    this.carouselContainer.nativeElement.scrollBy({
      left: -this.scrollAmount,
      behavior: 'smooth'
    });
  }

  scrollRight(): void {
    this.carouselContainer.nativeElement.scrollBy({
      left: this.scrollAmount,
      behavior: 'smooth'
    });
  }

  onWheel(event: WheelEvent): void {
    if (event.deltaY !== 0) {
      event.preventDefault();
      this.carouselContainer.nativeElement.scrollBy({
        left: event.deltaY,
        behavior: 'smooth'
      });
    }
  }
}
