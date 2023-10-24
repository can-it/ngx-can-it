import { TestBed } from '@angular/core/testing';

import { PermissionsStore } from './permissions-store.service';

describe('PermissionsStoreService', () => {
  let service: PermissionsStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermissionsStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
