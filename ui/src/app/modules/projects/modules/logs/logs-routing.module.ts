import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogDashboardComponent } from './components/log/log.component';

const routes: Routes = [
  {
    path: '',
    component: LogDashboardComponent,
    children: []
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogsRoutingModule { }
