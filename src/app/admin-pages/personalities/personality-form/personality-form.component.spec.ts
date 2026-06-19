import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalityFormComponent } from './personality-form.component';

describe('PersonalityFormComponent', () => {
  let component: PersonalityFormComponent;
  let fixture: ComponentFixture<PersonalityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalityFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
