import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { ILogs, ILogsFilter } from 'src/app/shared/interfaces/ILogs';
import { ProjectsService } from '../../../../services/projects.service';
import { ActivatedRoute } from '@angular/router';
import { LogService } from '../../services/log/log.service';
import { PageEvent } from '@angular/material/paginator';

import { Socket } from 'ngx-socket-io';
import { IProject } from 'src/app/shared/interfaces/IProject';


@Component({
    selector: 'app-log',
    templateUrl: './log.component.html',
    styleUrls: ['./log.component.less']
})
export class LogDashboardComponent implements OnInit {

    public size = 5;
    public length = 0;
    public page = 1;
    public subscription: Subscription;
    public sub: Subscription;
    public id: string;
    public logs: Array<ILogs> = [];
    public search: string = "search";
    public message: string = "There are no results that match your search";
    public filters: ILogsFilter;
    public project: IProject

    constructor(
        private logService: LogService,
        private route: ActivatedRoute,
        private socket: Socket,
        private projectService: ProjectsService) {

    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
            console.log(this.id);
            this.getLogs(this.id);
            this.getProject(this.id);
        });

        this.socket.on('new-logs', (projectid: string) => {
            if (this.id == projectid) {
                this.getLogs(this.id);
            }
        })
        
    }

    public getLogs(id: string): void {
        var storedProject = this.id;
        if (storedProject !== null && storedProject !== '') {
            this.logService.logsByProject(storedProject, this.page, this.size, this.filters).subscribe((logs: any) => {
                this.logs = logs.items;
                this.length = logs.total;
            });
        }
    }

    public filter(filter: ILogsFilter) {
        this.page = 1;
        this.length = this.length;
        this.filters = filter;
        this.getLogs(this.id);
    }

    changePage(changes: PageEvent) {
        this.page = changes.pageIndex;
        if (this.size !== changes.pageSize) {
            this.page = 1;
            this.size = changes.pageSize;
        }

        this.getLogs(this.id);
    }
    public getProject(id: string) {
        this.projectService.projectById(id).subscribe((project) => {
            this.project = project
        })
    }
}
