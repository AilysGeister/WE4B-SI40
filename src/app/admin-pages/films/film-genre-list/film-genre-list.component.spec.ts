import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmGenreListComponent } from './film-genre-list.component';

describe('FilmGenreListComponent', () => {
  let component: FilmGenreListComponent;
  let fixture: ComponentFixture<FilmGenreListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmGenreListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmGenreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
