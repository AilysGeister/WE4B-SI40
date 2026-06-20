import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalitiesSelectorComponent } from './personalities-selector.component';

describe('PersonalitiesSelectorComponent', () => {
  let component: PersonalitiesSelectorComponent;
  let fixture: ComponentFixture<PersonalitiesSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalitiesSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalitiesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
