import { TestBed } from '@angular/core/testing';

import { Authadminservice } from './auth-admin.service';

describe('AuthAdminService', () => {
  let service: Authadminservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Authadminservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
