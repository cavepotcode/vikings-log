import { Routes, RouterModule } from '@angular/router';
import { PrivateComponent } from './components/private/private.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '', component: PrivateComponent, children: [
      { 
        path: 'projects', loadChildren: () => import(`../projects/projects.module`).then(m => m.ProjectsModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRouting { }
