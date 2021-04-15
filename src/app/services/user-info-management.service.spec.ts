import { TestBed } from '@angular/core/testing';

import { UserInfoManagementService } from './user-info-management.service';

describe('UserInfoManagementService', () => {
  let service: UserInfoManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInfoManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
