import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import PermissionsState from '../types/permissions-state';

@Injectable({
  providedIn: 'root'
})
export class PermissionsStore {
  private state$ = new ReplaySubject<PermissionsState>(1);

  get() {
    return this.state$.asObservable();
  }

  update(permissions: PermissionsState) {
    this.state$.next(permissions);
  }
}
