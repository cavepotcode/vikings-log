import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateComponent } from './components/private/private.component';
import { PrivateRouting } from './private-section-routing.module';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { SharedModule } from '../../../../src/app/shared/shared.module';
import { LogComponent } from './components/log/log.component';
import { HeaderComponent } from './components/components/header/header.component';
import { FilterComponent } from './components/filter/filter.component';
import { LogTableComponent } from './components/log-table/log-table.component';
import { LogItemComponent } from './components/log-item/log-item.component';
// import { MatPaginator } from '@angular/material/paginator';


@NgModule({
  declarations: [PrivateComponent, NavigationComponent, LogComponent, HeaderComponent, FilterComponent, LogTableComponent, LogItemComponent],
  imports: [
    CommonModule,
    PrivateRouting,
    LayoutModule,
    SharedModule
  ]
})
export class PrivateSectionModule { }
