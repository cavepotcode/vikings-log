import { trigger } from '@angular/animations';
import { CDK_DESCRIBEDBY_HOST_ATTRIBUTE } from '@angular/cdk/a11y';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectsService } from 'src/app/modules/projects/services/projects.service';
import { Constants } from 'src/app/shared/consts/app-constants';
import { IProjectItem } from 'src/app/shared/interfaces/IProject';
import { ICreateUser, IUser, IUserWithOutPassword } from 'src/app/shared/interfaces/IUser';
import { UserService } from 'src/app/shared/services/user/user.service';


@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.less']
})
export class UserFormComponent implements OnInit {
    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any) {
      if (this.formDirty) {
        $event.returnValue = true;
      }
    }
    public id: string;
    public userForm: FormGroup;
    public panelOpenState = false;
    public projectsItems: Array<IProjectItem>;
    public projectsSelected: Array<IProjectItem> = [];
    public setNewPassword = false;
    public user: IUser;


    public submitButton: string;
    public updateUser: boolean;
    public hide = true;

    get form() { return this.userForm.controls; }
    get formDirty() { return this.userForm.dirty; }
    get formComplete(){return this.userForm;}

    constructor(private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private userService: UserService,
        private toastService: ToastrService,
        private router: Router,
        private projectService: ProjectsService) {

    }

    ngOnInit() {
        this.userForm = this.formBuilder.group({
            user: [null, [Validators.required]],
            email: [null, [Validators.required, Validators.email]],
            administrador: false,
            password:null


        })
        this.getParameter();
        this.getAllProjects();
    }
    getParameter() {
        this.id = this.activatedRoute.snapshot.paramMap.get('id')
        if (this.id) {
            this.updateState(true);
            this.getUser(this.id)
        }
        else {
            this.form.password.setValidators([Validators.required]);
            this.form.password.setValue(generatePass())
            this.updateState(false);
        }
    }


    submit() {
        if (!this.userForm.valid) {
            return;
        }
        this.submitUser();
    }

    public userValidation() {
        if (this.form.user.errors.required) {
            return 'User field is mandatory';
        }
    }
    public emailValidation() {
        if (this.form.email.errors.required) {
            return 'Email field is mandatory';
        }
        if (this.form.email.errors.email) {
            return 'Email incorrect format';
        }
    }
    public passwordValidation() {
        if (this.form.password.errors.required) {
            return 'Password field is mandatory';
        }
    }


    public submitUser() {
        
        if (this.updateUser) {
            let user: IUserWithOutPassword = {
                email: this.form.email.value,
                username: this.form.user.value,
                projects: this.projectsSelected,
                role: this.form.administrador.value == true ? Constants.ROLE_ADMINISTRATOR : Constants.ROLE_USER
            }
            this.userService.updateUser(this.id, user).subscribe(data => {
                this.toastService.success('User has been updated');
                this.formComplete.reset(this.user)
                this.router.navigate([`/private/projects/users/list`]);
            })
        }
        else {
            let user: ICreateUser = {
                email: this.form.email.value,
                username: this.form.user.value,
                password: this.form.password.value,
                projects: this.projectsSelected,
                role: this.form.administrador.value == true ? Constants.ROLE_ADMINISTRATOR : Constants.ROLE_USER
            }

            this.userService.createUser(user).subscribe(data => {
                this.toastService.success('User has been created');
                this.formComplete.reset(this.user)
                this.router.navigate([`/private/projects/users/list`]);
            })
        }
    }


    public getAllProjects() {
        this.projectService.projectsList().subscribe(projects => {
            this.projectsItems = projects
        })
    }
    public generatePassword() {
        this.setNewPassword = this.setNewPassword ? false : true;
        if (!this.form.password.value) {
            this.form.password.setValue(generatePass());
        }
    }
    public reGeneratePassword() {
        this.form.password.setValue(generatePass());
    }

    public getProjects(data: Array<IProjectItem>) {
        this.formComplete.markAsDirty();
        this.projectsSelected = data;
    }

    public getUser(id: string) {
        this.userService.getUser(id).subscribe(user => {
            this.loadUser(user);
        })
    }

    public loadUser(user: IUserWithOutPassword) {
        this.form.email.setValue(user.email);
        this.form.user.setValue(user.username);
        if (user.role == Constants.ROLE_ADMINISTRATOR) {
            this.form.administrador.setValue(true);
        }
        this.projectsSelected = user.projects;
        this.form.password.invalid;
    }

    public updateState(update: boolean) {
        this.updateUser = update;
        this.submitButton = update ? 'Update' : 'Register';
    }
    public cancelForm(){
        this.formComplete.reset(this.user)
        this.router.navigate([`/private/projects/users/list`]);
    }

}
const generatePass = () => {
    var length = 30,
        charset = "+-*/abcdefghijklm#~=+_?!nopqrstuHIJKLM+-*/#~ABCDEFG=+_?!NOPQRSTU3456789+-*/#~=+_?!vwxyzVWXYZ012",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}