import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogMainComponent } from './components/log-main/log-main.component';
import { LogsRoutingModule } from './logs-routing.module';
import { LogDetailsComponent } from './components/log-details/log-details.component';
import { FilterComponent } from './components/log/filter/filter.component';
import { LogTableComponent } from './components/log/log-table/log-table.component';
import { LogItemComponent } from './components/log/log-item/log-item.component';
import { LogDashboardComponent } from './components/log/log.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [LogMainComponent, LogDetailsComponent, LogDashboardComponent, FilterComponent, LogTableComponent, LogItemComponent],
  imports: [
    CommonModule,
    LogsRoutingModule,
    SharedModule
  ]
})
export class LogsModule { }
