import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { UserFormComponent } from 'src/app/modules/projects/modules/users/components/user-form/user-form.component';

@Injectable({
    providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<UserFormComponent> {
    canDeactivate(component: UserFormComponent) {
        if (component.formDirty) {
            return confirm('Are you sure you want to continue? changes will be lost');
        }
        return true;
    }
}
