import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './components/projects/projects.component';
import { BrowserModule } from '@angular/platform-browser';
import { ProjectRouting } from './projects-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewProjectModalComponent } from './components/new-project-modal/new-project-modal.component';
import { DeleteProjectModalComponent } from './components/delete-project-modal/delete-project-modal.component';

@NgModule({
  declarations: [ProjectsComponent, NewProjectModalComponent, DeleteProjectModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ProjectRouting,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ProjectsModule { }
