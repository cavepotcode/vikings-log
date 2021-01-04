import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectsService } from '../../services/projects.service';

@Component({
    selector: 'app-delete-project-modal',
    templateUrl: './delete-project-modal.component.html',
    styleUrls: ['./delete-project-modal.component.less']
})
export class DeleteProjectModalComponent implements OnInit {

    private idProject: string;
    constructor(@Inject(MAT_DIALOG_DATA) public data: { id: string, name: string }, private projectsService: ProjectsService) {
        this.idProject = data.id;
    }

    ngOnInit(): void {
    }

    public deleteProject() {
        this.projectsService.deleteProject(this.idProject).subscribe((data)=>{

        });
    }

}
