import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './components/projects/projects.component';
import { NgModule } from '@angular/core';
import { PrivateComponent } from '../private-section/components/private/private.component';

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
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRouting { }