import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenresSelectComponent } from './genres-selector.component';

describe('GenresSelectComponent', () => {
  let component: GenresSelectComponent;
  let fixture: ComponentFixture<GenresSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenresSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenresSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
