import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinedFilmsComponent } from './pined-films.component';

describe('PinedFilmsComponent', () => {
  let component: PinedFilmsComponent;
  let fixture: ComponentFixture<PinedFilmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PinedFilmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PinedFilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
