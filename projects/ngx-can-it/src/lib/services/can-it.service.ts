import { Injectable } from '@angular/core';
import { PermissionsStore } from './permissions-store.service';
import { of, switchMap } from 'rxjs';
import PermissionsState from '../types/permissions-state';
import { Request } from '../types/permission';

@Injectable({
  providedIn: 'root'
})
export class CanItService {
  constructor(
    private permissionsStore: PermissionsStore
  ) {}

  can(request: Request) {
    return this.permissionsStore.get().pipe(
      switchMap(state => of(this.allow(state, request)))
    );
  }

  private allow(state: PermissionsState, [reqAction, reqRi]: Request) {
    // currently, it only checks if the exactly provided have the action and ri in provided permissions or not
    // We can support Regex check in the future.
    return !!state.allow.find(([action, ri]) => reqAction === action && reqRi === ri)
  }
}
