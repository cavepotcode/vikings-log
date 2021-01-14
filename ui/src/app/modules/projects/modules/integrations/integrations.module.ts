import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntegrationsRoutingModule } from './integrations-routing.module';
import { IntegrationComponent } from "./components/integration/integration.component";
import { NecoreComponent } from './components/necore/necore.component';
import { PhpComponent } from './components/php/php.component';

import {MatTabsModule} from '@angular/material/tabs';
import { TabsComponent } from './components/tabs/tabs.component';
import {MatCardModule} from '@angular/material/card';

import { ClipboardModule } from '@angular/cdk/clipboard';
import {MatTooltipModule} from '@angular/material/tooltip';
import { SharedModule } from 'src/app/shared/shared.module';
import { NodeComponent } from './components/node/node.component';

@NgModule({
  declarations: [IntegrationComponent, TabsComponent, NecoreComponent, PhpComponent, NodeComponent],
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
