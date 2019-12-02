import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';

import { ExploreRoutingModule } from './explore-routing.module';

// Components
import { ExploreListComponent } from './pages/list/list.component';
import { ExploreViewComponent } from './pages/view/view.component';

@NgModule({
  imports: [CommonModule, FormsModule, ExploreRoutingModule, NgZorroAntdModule],
  declarations: [ExploreListComponent, ExploreViewComponent],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
  ],
})
export class ExploreModule { }
