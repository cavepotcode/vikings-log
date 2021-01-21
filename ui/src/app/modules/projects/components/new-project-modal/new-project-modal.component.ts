import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TileStyler } from '@angular/material/grid-list/tile-styler';
import { Router } from '@angular/router';
import { IProjectType } from 'src/app/shared/interfaces/IProjectType';
import { ValidateBlanks } from 'src/app/shared/validators/custom.validators';
import { ProjectsService } from '../../services/projects.service';

@Component({
    selector: 'app-new-project-modal',
    templateUrl: './new-project-modal.component.html',
    styleUrls: ['./new-project-modal.component.less']
})
export class NewProjectModalComponent implements OnInit {
    public typeProject: Array<IProjectType> = [];
    projectForm: FormGroup;
    public selectedtype: String;
    get f() { return this.projectForm.controls; }

    constructor(private formBuilder: FormBuilder, private projectSvc: ProjectsService, private router: Router) { }

    ngOnInit(): void {
        this.projectForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            type: [null, Validators.required]
        }, {
            validator: ValidateBlanks('name', 'Project cannot have blanks')
        }   
        );
        this.getProjectType();
    }

    public submit(): void {
        this.projectSvc.create({
            apiKey: this.projectForm.value.apikey,
            title: this.projectForm.value.name,
            type: this.projectForm.value.type
        }).subscribe((data) => {
            this.router.navigate([`/private/projects/project/${data.data.identifiers[0].id}/logs`]);
        });

    }

    public getProjectType() {
        this.projectSvc.projectType().subscribe((types: any) => {
            this.typeProject = types;
        })
    }

    public getProjectNameErrorMessage(){
        if (this.f.name.errors.required){
          return 'Project name is required';
        }
        if (this.f.name.errors.cannotContainSpace){
          return this.f.name.errors.cannotContainSpace;
        }
      }
}
