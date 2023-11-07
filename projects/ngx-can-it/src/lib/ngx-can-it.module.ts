import { ModuleWithProviders, NgModule } from '@angular/core';
import { CanItDirective } from './directives/can-it.directive';
import { CanItPipe } from './pipes/can-it.pipe';
import { PermissionsStore } from './services/permissions-store.service';
import { CanItService } from './services/can-it.service';
import { ACTION_OPERATOR, RI_OPERATOR } from './constants/token';
import { Comparator, ExactComparator } from '@can-it/core';

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
    actionOperator: Comparator = new ExactComparator(),
    riOperator: Comparator = new ExactComparator()
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
