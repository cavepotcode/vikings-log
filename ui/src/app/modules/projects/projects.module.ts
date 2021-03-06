import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectRouting } from './projects-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewProjectModalComponent } from './components/new-project-modal/new-project-modal.component';

@NgModule({
  declarations: [ProjectsComponent, NewProjectModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ProjectRouting,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ProjectsModule { }
