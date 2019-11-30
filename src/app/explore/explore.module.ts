import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';

import { ExploreRoutingModule } from './explore-routing.module';

// Components
import { ExploreComponent } from './explore.component';

@NgModule({
  imports: [CommonModule, ExploreRoutingModule, NgZorroAntdModule],
  declarations: [ExploreComponent],
  exports: [ExploreComponent],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
  ],
})
export class ExploreModule { }
