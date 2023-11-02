import { ModuleWithProviders, NgModule } from '@angular/core';
import { CanItDirective } from './directives/can-it.directive';
import { CanItPipe } from './pipes/can-it.pipe';
import { PermissionsStore } from './services/permissions-store.service';
import { CanItService } from './services/can-it.service';
import { ActionOperator, EqualActionOperator, EqualRiOperator, RiOperator } from '@can-it/core';
import { ACTION_OPERATOR, RI_OPERATOR } from './constants/token';

@NgModule({
  declarations: [
    CanItDirective,
    CanItPipe
  ],
  imports: [
  ],
  exports: [
    CanItDirective,

    CanItPipe
  ]
})
export class NgxCanItModule {
  public static forNewScope(
    actionOperator: ActionOperator = new EqualActionOperator(),
    riOperator: RiOperator = new EqualRiOperator()
  ): ModuleWithProviders<NgxCanItModule> {
    return {
      ngModule: NgxCanItModule,
      providers: [
        PermissionsStore,
        
        CanItService,

        { provide: ACTION_OPERATOR, useValue: actionOperator },
        { provide: RI_OPERATOR, useValue: riOperator }
      ]
    }
  }

  public static forChild(): ModuleWithProviders<NgxCanItModule> {
    return {
      ngModule: NgxCanItModule,
      providers: []
    }
  }
}
