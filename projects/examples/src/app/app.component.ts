import { Component, OnInit } from '@angular/core';
import { PolicyState } from '@can-it/core';
import { PermissionsStore } from 'ngx-can-it';
import { Observable, first, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'examples';
  deniedClick = false;
  allowedClick = true;
  currentPolicy$: Observable<PolicyState>;

  constructor(
    private policyStore: PermissionsStore
  ) {}

  ngOnInit(): void {
    this.policyStore.update({
      allow: [
        ['click', 'documents'],
        ['view', 'documents']
      ],
      // deny: [
      //   ['click', 'documents']
      // ]
    });

    this.currentPolicy$ = this.policyStore.get();
  }

  toggleClick() {
    this.allowedClick = !this.allowedClick;
    this.currentPolicy$.pipe(first()).subscribe(state => {
      if (this.allowedClick) {
        this.policyStore.update({ ...state, allow: state.allow.concat([['click', 'documents']]) });
        return;
      }
      this.policyStore.update({ ...state, allow: state.allow.filter(p => p[0] !== 'click') });
    });
  }
  
  toggleDenyClick() {
    this.deniedClick = !this.deniedClick;
    this.currentPolicy$.pipe(first()).subscribe(state => {
      if (this.deniedClick) {
        this.policyStore.update({ ...state, deny: (state.deny || []).concat([['click', 'documents']]) });
        return;
      }
      this.policyStore.update({ ...state, deny: state.deny?.filter(p => p[0] !== 'click') });
    });
  }
}
