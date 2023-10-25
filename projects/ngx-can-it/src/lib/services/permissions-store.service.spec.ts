import { TestBed } from '@angular/core/testing';

import { PermissionsStore } from './permissions-store.service';
import PermissionsState from '../types/permissions-state';

describe('PermissionsStoreService', () => {
  let service: PermissionsStore;
  const executors = { get: (value: PermissionsState) => {} };

  const ALLOW_EDIT_USER: PermissionsState = {
    allow: [
      ['edit', 'user']
    ]
  };
  const EMPTY_PERMISSIONS: PermissionsState = {
    allow: []
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PermissionsStore]
    });
    service = TestBed.inject(PermissionsStore);
    spyOn(executors, 'get');
  });

  it('should have no intial state', () => {
    service.get().subscribe(executors.get);
    service.update(ALLOW_EDIT_USER);
    
    expect(executors.get).toHaveBeenCalledOnceWith(ALLOW_EDIT_USER);
  });

  it('should notify when the new permissions are updated', () => {
    service.get().subscribe(executors.get);
    service.update(ALLOW_EDIT_USER);
    service.update(EMPTY_PERMISSIONS);
    
    expect(executors.get).toHaveBeenCalledWith(EMPTY_PERMISSIONS);
    expect(executors.get).toHaveBeenCalledWith(ALLOW_EDIT_USER);
  });
});
