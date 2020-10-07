import { Routes, RouterModule } from '@angular/router';
import { NewProjectComponent } from './components/new-project/new-project.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '', component: ProjectsComponent,
    children: [
      {
        path: 'create', component: NewProjectComponent
      },
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