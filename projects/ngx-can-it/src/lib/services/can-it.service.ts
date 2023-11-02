import { Inject, Injectable } from '@angular/core';
import { PermissionsStore } from './permissions-store.service';
import { Observable, map } from 'rxjs';
import { Request } from '../types/permission';
import { ActionOperator, CanIt, RiOperator } from '@can-it/core';
import { ACTION_OPERATOR, RI_OPERATOR } from '../constants/token';

@Injectable({
  providedIn: 'root'
})
export class CanItService {
  private canIt$: Observable<CanIt>;

  constructor(
    @Inject(ACTION_OPERATOR) actionOperator: ActionOperator,
    @Inject(RI_OPERATOR) riOperator: RiOperator,
    permissionsStore: PermissionsStore,
  ) {
    this.canIt$ = permissionsStore.get().pipe(
      map(state => new CanIt(state, actionOperator, riOperator))
    );
  }

  can(request: Request) {
    return this.canIt$.pipe(
      map(canIt => canIt.allowTo(...request))
    );
  }
}
