import { Injectable } from '@angular/core';
import { PermissionsStore } from './permissions-store.service';
import { of, switchMap } from 'rxjs';
import PermissionsState from '../types/permissions-state';
import { Permission, Request } from '../types/permission';

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

  private allow(state: PermissionsState, request: Request) {
    if (state.deny?.find(p => this.isMatchPermission(request, p))) {
      return false;
    }

    return !!state.allow.find(p => this.isMatchPermission(request, p));
  }

  /**
   * This function verifies whether the provided request has access to a specific permission.
   * Note: Currently, it only supports exact matching, and Regex matching will be supported in the later version.
   */
  private isMatchPermission(request: Request, permission: Permission) {
    const [reqAction, reqRi] = request;
    const [action, ri] = permission;
    return reqAction === action && reqRi === ri;
  }
}
