import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastReportsComponent } from './last-reports.component';

describe('LastReportsComponent', () => {
  let component: LastReportsComponent;
  let fixture: ComponentFixture<LastReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
