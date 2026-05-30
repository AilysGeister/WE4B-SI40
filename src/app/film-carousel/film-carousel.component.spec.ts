import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmCarouselComponent } from './film-carousel.component';

describe('FilmCarouselComponent', () => {
  let component: FilmCarouselComponent;
  let fixture: ComponentFixture<FilmCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
