import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChooseSeatsComponent } from './choose-seats.component';
import { of } from 'rxjs';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { LoginService } from '../../auth/login/login.service';
import { ReservationService } from '../reservation.service';

describe('ChooseSeatsComponent', () => {
  let component: ChooseSeatsComponent;
  let fixture: ComponentFixture<ChooseSeatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChooseSeatsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ programmeId: '1' }))
          }
        },
        {
          provide: LoginService,
          useValue: {
            currentUser$: of({ id: 1 })
          }
        },
        {
          provide: ReservationService,
          useValue: {
            getProgramme: () => of({ id: 1, date: new Date().toISOString(), film: { title: 'Film', price: 10 }, room: { id: 1 } }),
            getRoomSeats: () => of([]),
            getSeat: () => of({}),
            createReservation: () => of({}),
            updateReservation: () => of({})
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
