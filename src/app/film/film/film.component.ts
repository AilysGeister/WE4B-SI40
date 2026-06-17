import {Component, OnInit} from '@angular/core';
import {Film} from "../../../models/film.model";
import {FilmService} from "../film.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {

  BASE_URL = "http://localhost:8000/resources/images/films_cover/";

  film: Film = new Film();

  constructor(
    private filmService: FilmService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.filmService.getFilmBySlug(slug).subscribe({
          next: (data: Film) => {
            this.film = data;
          },
          error: (err) => {
            this.router.navigate(['/']);
          }
        });
      }
    });
  }
}
