import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateComponent } from './components/private/private.component';
import { PrivateRouting } from './private-section-routing.module';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SharedModule } from '../../../../src/app/shared/shared.module';
import { LogComponent } from './components/log/log.component';
import { HeaderComponent } from './components/components/header/header.component';



@NgModule({
  declarations: [PrivateComponent, NavigationComponent, LogComponent, HeaderComponent],
  imports: [
    CommonModule,
    PrivateRouting,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    SharedModule,
  ]
})
export class PrivateSectionModule { }
