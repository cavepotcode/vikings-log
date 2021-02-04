import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../../../src/app/shared/services/user/user.service';
import { IProject } from '../../../../../../src/app/shared/interfaces/IProject';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';

@Component({
    selector: 'app-private',
    templateUrl: './private.component.html',
    styleUrls: ['./private.component.less']
})
export class PrivateComponent implements OnInit {

    defaultProject: string = '';
    projects: Array<IProject>;
    user: any;
    sub: any;
    id: any;
    text:string;

    constructor(
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute,
        private socket: Socket) {
    }

    ngOnInit(): void {
        this.getProjects();
        this.userService.current().subscribe((response: any) => {
            this.user = response.data;
        });
        this.socket.on('refresh-project-list', () => {
            this.getProjects();
        })
    }

    public getProjects() {
        this.userService.projects(this.text).subscribe((response: any) => {
            this.projects = response;
        });
    }

    public projectChange(event: string): void {
        this.defaultProject = event;
        // this.localSt.store('currentProject', this.defaultProject);
    }

}
