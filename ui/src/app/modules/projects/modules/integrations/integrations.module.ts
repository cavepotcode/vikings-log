import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntegrationsRoutingModule } from './integrations-routing.module';
import { IntegrationComponent } from "./components/integration/integration.component";
import {MatTabsModule} from '@angular/material/tabs';
import { TabsComponent } from './components/tabs/tabs.component';
import {MatCardModule} from '@angular/material/card';

import { ClipboardModule } from '@angular/cdk/clipboard';
import {MatTooltipModule} from '@angular/material/tooltip';
import { SharedModule } from 'src/app/shared/shared.module';

import { IntegrationCodeComponent } from './components/integration-code/integration-code.component';

@NgModule({
  declarations: [IntegrationComponent, TabsComponent, IntegrationCodeComponent],
  imports: [
    CommonModule,
    IntegrationsRoutingModule,
    MatTabsModule,
    MatCardModule,
    MatTooltipModule,
    ClipboardModule,
    SharedModule
  ]
})
export class IntegrationsModule { }
