import { TestBed } from '@angular/core/testing';

import { MkApiService } from './mk-api.service';

describe('MkApiService', () => {
  let service: MkApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MkApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
