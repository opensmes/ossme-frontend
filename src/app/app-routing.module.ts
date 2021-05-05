import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const dashboardModule = () =>
  import('./dashboard/dashboard.module').then((x) => x.DashboardModule);

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: dashboardModule,
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
