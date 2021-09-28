import { TestBed } from '@angular/core/testing';

import { NeedLoginGuard } from './need-login.guard';

describe('NeedLoginGuard', () => {
  let guard: NeedLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NeedLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
