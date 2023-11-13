import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { CanItService, PermissionsStore } from 'ngx-can-it';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit, OnDestroy {
  @HostBinding('class.correct')
  correct: boolean;

  sub: Subscription;

  constructor(
    private canIt: CanItService,
    private policyStore: PermissionsStore
  ) {}

  ngOnInit(): void {
    this.policyStore.update({
      allow: [
        ['click', 'document']
      ]
    });
    this.sub = this.canIt.can(['view', 'document'])
      .subscribe(can => this.correct = !can);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
