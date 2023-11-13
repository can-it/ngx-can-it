import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import PolicyState from '../types/policy-state';

@Injectable({
  providedIn: 'root'
})
export class PolicyStore {
  private state$ = new ReplaySubject<PolicyState>(1);

  get() {
    return this.state$.asObservable();
  }

  update(permissions: PolicyState) {
    this.state$.next(permissions);
  }
}
