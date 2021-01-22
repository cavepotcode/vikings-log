import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './components/projects/projects.component';
import { NgModule } from '@angular/core';


const routes: Routes = [
    {
        path: '', component: ProjectsComponent,
        children: [
            {
                path: 'project', children: [
                    {
                        path: ':id', children: [
                            {
                                path: 'logs', loadChildren: () => import(`./modules/logs/logs.module`).then(m => m.LogsModule)
                            }
                        ]
                    }
                ],
                
            }
        ]
    },
    { path: 'integrations', loadChildren: () => import(`./modules/integrations/integrations.module`).then(m => m.IntegrationsModule) },
    { path: 'users', loadChildren: () => import(`./modules/users/users.module`).then(m => m.UsersModule) },
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectRouting { }