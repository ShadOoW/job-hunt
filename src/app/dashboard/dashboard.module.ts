import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';

// Components
import { DashboardLoginComponent } from './pages/login/login.component';
import { DashboardPostComponent } from './pages/post/post.component';

// Services
import { AuthService } from './services/auth.service';
import { JobsService } from './services/jobs.service';

// Guard
import { AuthGuard } from "./guard/auth.guard";

@NgModule({
  declarations: [
    DashboardLoginComponent,
    DashboardPostComponent
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
    AuthService,
    JobsService,
    AuthGuard
  ],
})

export class DashboardModule { }
