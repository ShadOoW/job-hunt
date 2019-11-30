import { NgModule } from '@angular/core';

import { ExploreRoutingModule } from './explore-routing.module';

import { ExploreComponent } from './explore.component';


@NgModule({
  imports: [ExploreRoutingModule],
  declarations: [ExploreComponent],
  exports: [ExploreComponent]
})
export class ExploreModule { }
