import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { IntegrationComponent } from "./components/integration/integration.component";

const routes: Routes = [
    {
        path: '',
        component: IntegrationComponent,
        children: []
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IntegrationsRoutingModule { }
