import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './components/users.component';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserFormProjectListComponent } from './components/user-form/user-form-project-list/user-form-project-list.component';
import { UserListComponent } from './components/user-list/user-list.component';


@NgModule({
  declarations: [UsersComponent, UserFormComponent, UserFormProjectListComponent, UserListComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
