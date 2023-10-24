import { ModuleWithProviders, NgModule } from '@angular/core';
import { CanItDirective } from './directives/can-it.directive';
import { CanItPipe } from './pipes/can-it.pipe';
import { PermissionsStore } from './services/permissions-store.service';
import { CanItService } from './services/can-it.service';

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
export class CanItModule {
  public static forNewScope(): ModuleWithProviders<CanItModule> {
    return {
      ngModule: CanItModule,
      providers: [
        PermissionsStore,
        
        CanItService
      ]
    }
  }

  public static forChild(): ModuleWithProviders<CanItModule> {
    return {
      ngModule: CanItModule,
      providers: []
    }
  }
}
