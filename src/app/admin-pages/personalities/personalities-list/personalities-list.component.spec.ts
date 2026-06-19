import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalitiesListComponent } from './personalities-list.component';

describe('PersonalitiesListComponent', () => {
  let component: PersonalitiesListComponent;
  let fixture: ComponentFixture<PersonalitiesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalitiesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalitiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
