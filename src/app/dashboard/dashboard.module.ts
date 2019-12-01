import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';

// Components
import { DashboardPostComponent } from './pages/post/post.component';
import { DashboardListComponent } from './pages/list/list.component';

@NgModule({
  declarations: [
    DashboardPostComponent,
    DashboardListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
  ],
})

export class DashboardModule { }
