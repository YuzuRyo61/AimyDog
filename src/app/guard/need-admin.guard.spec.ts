import { TestBed } from '@angular/core/testing';

import { NeedAdminGuard } from './need-admin.guard';

describe('NeedAdminGuardGuard', () => {
  let guard: NeedAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NeedAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
