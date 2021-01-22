import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UsersComponent } from './components/users.component';
import { PreventUnsavedChangesGuard } from "./../../../../shared/guards/prevent-unsaved-changes/prevent-unsaved-changes.guard";

const routes: Routes = [
    {
        path: '', component: UsersComponent,
        children: [
            { path: 'form', component: UserFormComponent, canDeactivate: [PreventUnsavedChangesGuard]  },
            { path: 'form/:id', component: UserFormComponent, canDeactivate: [PreventUnsavedChangesGuard] },
            { path: 'list', component: UserListComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
