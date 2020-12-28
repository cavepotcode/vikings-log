import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IProjectType } from 'src/app/shared/interfaces/IProjectType';
import { ProjectsService } from '../../services/projects.service';

@Component({
    selector: 'app-new-project-modal',
    templateUrl: './new-project-modal.component.html',
    styleUrls: ['./new-project-modal.component.less']
})
export class NewProjectModalComponent implements OnInit {
    public typeProject: Array<IProjectType> = [];
    projectForm: FormGroup;
    public selectedtype:String;

    constructor(private formBuilder: FormBuilder, private projectSvc: ProjectsService, private router: Router) { }

    ngOnInit(): void {
        this.projectForm = this.formBuilder.group({
            name: [null, [Validators.required]],
            type: [null, Validators.required]
        });
        this.getProjectType();
    }

    public submit(): void {
        this.projectSvc.create({
            apiKey: this.projectForm.value.apikey,
            title: this.projectForm.value.name,
            type: this.projectForm.value.type
        }).subscribe((data) => {
            console.log(data);
            this.router.navigate(['private/projects/project/5fea5d65b9d92a0dc84ae001/logs']);
        });
        
    }

    public getProjectType() {
        this.projectSvc.projectType().subscribe((types: any) => {
            this.typeProject = types;
        })
    }
}
