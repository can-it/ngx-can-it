import { TestBed } from '@angular/core/testing';

import { PolicyStore } from './policy-store.service';
import PolicyState from '../types/policy-state';

describe('PolicyStore', () => {
  let service: PolicyStore;
  const executors = { get: (value: PolicyState) => {} };

  const ALLOW_EDIT_USER: PolicyState = {
    allow: [
      ['edit', 'user']
    ]
  };
  const EMPTY_PERMISSIONS: PolicyState = {
    allow: []
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PolicyStore]
    });
    service = TestBed.inject(PolicyStore);
    spyOn(executors, 'get');
  });

  it('should have no initialization state', () => {
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
