import { TestBed } from '@angular/core/testing';

import { EditProfileGuard } from './edit-profile.guard';

describe('EditProfileGuard', () => {
  let guard: EditProfileGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EditProfileGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
