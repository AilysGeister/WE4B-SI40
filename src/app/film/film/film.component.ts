import {Component, OnInit} from '@angular/core';
import {Film} from "../../../models/film.model";
import {FilmService} from "../film.service";
import {ActivatedRoute, Router} from "@angular/router";

interface FilmProgramme {
  id: number;
  date: string | Date;
  is_closed?: boolean;
  lang_name?: string;
}

interface ProgrammeGroup {
  dateLabel: string;
  programmes: FilmProgramme[];
}

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {

  BASE_URL = "http://localhost:8000/resources/images/films_cover/";

  film: Film = new Film();
  programmeGroups: ProgrammeGroup[] = [];

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
            const filmId = this.getFilmId(data as any);

            if (filmId === null) {
              this.programmeGroups = [];
              return;
            }

            this.filmService.getProgrammesByFilmId(filmId).subscribe({
              next: (programmes) => {
                this.programmeGroups = this.buildProgrammeGroups(this.extractOpenProgrammes(programmes));
              },
              error: () => {
                this.programmeGroups = [];
              }
            });
          },
          error: (err) => {
            this.router.navigate(['/']);
          }
        });
      }
    });
  }

  goToProgramme(programme: FilmProgramme): void {
    this.router.navigate(['/reservation/choose-seats', programme.id]);
  }

  getProgrammeTime(programme: FilmProgramme): string {
    const date = new Date(programme.date);
    if (Number.isNaN(date.getTime())) {
      return '';
    }

    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getProgrammeLanguageLabel(programme: FilmProgramme): string {
    const language = (programme?.lang_name ?? '').toLowerCase();

    if (language.includes('fr')) {
      return 'VF';
    }

    if (language.includes('ang')) {
      return 'VO';
    }

    return programme?.lang_name ?? '';
  }

  getProgrammeLanguageIcon(programme: FilmProgramme): string | null {
    const language = (programme?.lang_name ?? '').toLowerCase();

    if (language.includes('fr')) {
      return 'vf.png';
    }

    if (language.includes('ang')) {
      return 've.png';
    }

    return null;
  }

  private getFilmId(film: any): number | null {
    const candidate = film?.id ?? film?.filmId ?? film?.film_id;
    const filmId = Number(candidate);

    return Number.isFinite(filmId) && filmId > 0 ? filmId : null;
  }

  private extractOpenProgrammes(programmes: any): FilmProgramme[] {
    const rawProgrammes = this.normalizeProgrammeResponse(programmes);

    return rawProgrammes.filter((programme: FilmProgramme) => {
      const isClosed = programme?.is_closed as any;
      return isClosed === false || isClosed === 0 || isClosed === 'false' || isClosed == null;
    });
  }

  private normalizeProgrammeResponse(programmes: any): FilmProgramme[] {
    if (Array.isArray(programmes)) {
      return programmes;
    }

    const candidateCollections = [
      programmes?.programmes,
      programmes?.data,
      programmes?.results,
      programmes?.['hydra:member']
    ];

    for (const candidate of candidateCollections) {
      if (Array.isArray(candidate)) {
        return candidate;
      }
    }

    return [];
  }

  private buildProgrammeGroups(programmes: FilmProgramme[]): ProgrammeGroup[] {
    const groupedProgrammes = new Map<string, FilmProgramme[]>();

    programmes.forEach((programme) => {
      const date = new Date(programme.date);
      if (Number.isNaN(date.getTime())) {
        return;
      }

      const key = date.toISOString().slice(0, 10);
      const existingProgrammes = groupedProgrammes.get(key) ?? [];
      groupedProgrammes.set(key, [...existingProgrammes, programme]);
    });

    return Array.from(groupedProgrammes.entries())
      .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
      .map(([, programmesForDate]) => {
        const sortedProgrammes = [...programmesForDate].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        const date = new Date(sortedProgrammes[0].date);

        return {
          dateLabel: this.formatProgrammeDate(date),
          programmes: sortedProgrammes
        };
      });
  }

  private formatProgrammeDate(date: Date): string {
    const label = date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    return label.charAt(0).toUpperCase() + label.slice(1);
  }
}
