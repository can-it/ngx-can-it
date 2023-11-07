import { ModuleWithProviders, NgModule } from '@angular/core';
import { CanItDirective } from './directives/can-it.directive';
import { CanItPipe } from './pipes/can-it.pipe';
import { PermissionsStore } from './services/permissions-store.service';
import { CanItService } from './services/can-it.service';
import { ACTION_COMPARATOR, RI_COMPARATOR } from './constants/token';
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
    actionComparator: Comparator = new ExactComparator(),
    riComparator: Comparator = new ExactComparator()
  ): ModuleWithProviders<NgxCanItModule> {
    return {
      ngModule: NgxCanItModule,
      providers: [
        PermissionsStore,
        
        CanItService,

        { provide: ACTION_COMPARATOR, useValue: actionComparator },
        { provide: RI_COMPARATOR, useValue: riComparator }
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
