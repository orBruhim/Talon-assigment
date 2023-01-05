import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardResolver } from './ngrx-store/dashboard.resolver';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    resolve: {
      events: DashboardResolver,
    },
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
