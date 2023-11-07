import { Inject, Injectable } from '@angular/core';
import { PermissionsStore } from './permissions-store.service';
import { Observable, map } from 'rxjs';
import { Request } from '../types/permission';
import { ACTION_COMPARATOR, RI_COMPARATOR } from '../constants/token';
import { CanIt, Comparator } from '@can-it/core';

@Injectable({
  providedIn: 'root'
})
export class CanItService {
  private canIt$: Observable<CanIt>;

  constructor(
    @Inject(ACTION_COMPARATOR) actionComparator: Comparator,
    @Inject(RI_COMPARATOR) riComparator: Comparator,
    permissionsStore: PermissionsStore,
  ) {
    this.canIt$ = permissionsStore.get().pipe(
      map(state => new CanIt(state, actionComparator, riComparator))
    );
  }

  can(request: Request) {
    return this.canIt$.pipe(
      map(canIt => canIt.allowTo(...request))
    );
  }
}
