import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LogMainComponent } from './components/log-main/log-main.component';
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
