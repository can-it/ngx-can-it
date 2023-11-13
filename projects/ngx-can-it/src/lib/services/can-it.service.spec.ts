import { TestBed } from '@angular/core/testing';

import { CanItService } from './can-it.service';
import { PolicyStore } from './policy-store.service';
import { Permission } from '../types/permission';

describe('NgxCanItService', () => {
  let service: CanItService;
  let store: PolicyStore;
  const DENY_PERMISSIONS: Permission[] = [
    ['delete', 'user']
  ];
  const ALLOW_PERMISSIONS: Permission[] = [
    ['edit', 'user'],
    ['delete', 'user'],
  ];

  const executors = {
    canSubscriber: (value: boolean) => {}
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanItService,
        PolicyStore,
      ]
    });

    service = TestBed.inject(CanItService);
    store = TestBed.inject(PolicyStore);
    spyOn(executors, 'canSubscriber');
  });

  it('should allow when the request matches the allow permissions', () => {
    store.update({ allow: ALLOW_PERMISSIONS });
    service.can(['edit', 'user']).subscribe(executors.canSubscriber);

    expect(executors.canSubscriber).toHaveBeenCalledOnceWith(true);
  });

  it('should not allow when the request does not match the allow permissions', () => {
    store.update({ allow: ALLOW_PERMISSIONS });
    service.can(['undefined-action', 'undefined-resource']).subscribe(executors.canSubscriber);

    expect(executors.canSubscriber).toHaveBeenCalledOnceWith(false);
  });

  it('should update the access permissions when they are updated', () => {
    service.can(['edit', 'user']).subscribe(executors.canSubscriber);
    store.update({ allow: ALLOW_PERMISSIONS });
    store.update({ allow: [] });

    expect(executors.canSubscriber).toHaveBeenCalledWith(true);
    expect(executors.canSubscriber).toHaveBeenCalledWith(false);
    expect(executors.canSubscriber).toHaveBeenCalledTimes(2);
  });

  it('should not allow if request matches deny permissions, even in "allow" permissions', () => {
    store.update({ allow: ALLOW_PERMISSIONS, deny: DENY_PERMISSIONS });
    service.can(['delete', 'user']).subscribe(executors.canSubscriber);

    expect(executors.canSubscriber).toHaveBeenCalledOnceWith(false);
  });

});
