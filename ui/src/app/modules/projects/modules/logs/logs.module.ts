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
import { LogItemDetailComponent } from './components/log/log-item-detail/log-item-detail.component';
import {WatermarkComponent} from './components/watermark/watermark.component';
import { FormsModule } from '@angular/forms';
import { NgxJsonViewerModule } from 'ngx-json-viewer';





@NgModule({
  declarations: [LogMainComponent, LogDetailsComponent, LogDashboardComponent, FilterComponent, LogTableComponent, LogItemComponent, LogItemDetailComponent,WatermarkComponent],
  imports: [
    CommonModule,
    LogsRoutingModule,
    SharedModule,
    FormsModule,
    NgxJsonViewerModule
  ]
})
export class LogsModule { }
