import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';

import { FilmComponent } from './film.component';
import { FilmService } from '../film.service';

describe('FilmComponent', () => {
  let component: FilmComponent;
  let fixture: ComponentFixture<FilmComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const filmServiceSpy = jasmine.createSpyObj('FilmService', ['getFilmBySlug', 'getProgrammesByFilmId']);

  beforeEach(async () => {
    filmServiceSpy.getFilmBySlug.and.returnValue(of({
      id: 1,
      title: 'Film test',
      visibleComments: [],
      programmes: []
    }));
    filmServiceSpy.getProgrammesByFilmId.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [FilmComponent],
      providers: [
        { provide: FilmService, useValue: filmServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ slug: 'film-test' }))
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
