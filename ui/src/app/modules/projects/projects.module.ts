import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProjectComponent } from './components/new-project/new-project.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { BrowserModule } from '@angular/platform-browser';
import { ProjectRouting } from './projects-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [NewProjectComponent, ProjectsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ProjectRouting,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ProjectsModule { }
