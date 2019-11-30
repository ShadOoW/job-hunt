import { NgModule } from '@angular/core';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';

import { ExploreRoutingModule } from './explore-routing.module';

// Components
import { ExploreComponent } from './explore.component';

@NgModule({
  imports: [ExploreRoutingModule, NgZorroAntdModule],
  declarations: [ExploreComponent],
  exports: [ExploreComponent],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
  ],
})
export class ExploreModule { }
