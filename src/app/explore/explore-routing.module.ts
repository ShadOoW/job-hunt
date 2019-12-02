import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExploreListComponent } from './pages/list/list.component';
import { ExploreViewComponent } from './pages/view/view.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'list' },
  { path: 'list', component: ExploreListComponent },
  { path: 'view/:id', component: ExploreViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExploreRoutingModule { }
