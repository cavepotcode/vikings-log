import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PrivateComponent } from './components/private/private.component';
import { PrivateRouting } from './private-section-routing.module';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { SharedModule } from '../../../../src/app/shared/shared.module';
import { LogComponent } from './components/log/log.component';
import { HeaderComponent } from './components/header/header.component';
import { FilterComponent } from './components/log/filter/filter.component';
import { LogTableComponent } from './components/log/log-table/log-table.component';
import { LogItemComponent } from './components/log/log-item/log-item.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { RouterModule } from '@angular/router';
// import { MatPaginator } from '@angular/material/paginator';


@NgModule({
  declarations: [PrivateComponent, NavigationComponent, LogComponent, HeaderComponent, FilterComponent, LogTableComponent, LogItemComponent],
  imports: [
    CommonModule,
    RouterModule,
    PrivateRouting,
    LayoutModule,
    SharedModule,
    FlexLayoutModule,
    NgxWebstorageModule.forRoot()
  ]
})
export class PrivateSectionModule { }
