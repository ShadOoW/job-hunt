import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPostComponent } from './pages/post/post.component';
import { DashboardLoginComponent } from './pages/login/login.component';

import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: DashboardLoginComponent,
  },
  {
    path: 'post',
    component: DashboardPostComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardRoutingModule { }
