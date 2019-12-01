import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPostComponent } from './pages/post/post.component';
import { DashboardListComponent } from './pages/list/list.component';

import { AuthGuard } from './../guard/auth.guard';

const routes: Routes = [
  {
    path: 'post',
    component: DashboardPostComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id',
    component: DashboardPostComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'list',
    component: DashboardListComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardRoutingModule { }
