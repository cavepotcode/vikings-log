import { Component, EventEmitter, OnInit, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ILogs, ILogsStatus } from 'src/app/shared/interfaces/ILogs';
import { ICheckItems } from 'src/app/shared/interfaces/ICheckItems';
import { Constants } from "src/app/shared/consts/app-constants";
import { LogService } from '../../../services/log/log.service';
import { IProject } from 'src/app/shared/interfaces/IProject';



@Component({
    selector: 'app-log-table',
    templateUrl: './log-table.component.html',
    styleUrls: ['./log-table.component.less']
})
export class LogTableComponent implements OnInit, OnChanges {
    pageSizeOptions = [2, 5, 10]
    pageEvent: PageEvent;
    allComplete: boolean = false;

    @Input() public logs: Array<ILogs>;
    @Input() public pageSize;
    @Input() public length;
    @Input() project :IProject
    @Output() paginatorChange = new EventEmitter();
    @Output() logsChange = new EventEmitter();
    public task: ICheckItems = {
        name: 'All-items',
        completed: false,
        subtasks: [],

    }

    constructor(private logService: LogService) { }

    ngOnInit(): void {
        this.loadsubtasks();
    }
    ngOnChanges(changes: SimpleChanges) {
        if (changes.hasOwnProperty('logs')) {
            this.task.subtasks = [];
            this.loadsubtasks();
        }
    }

    loadsubtasks() {
        if (this.task.subtasks.length != this.logs.length) {
            this.logs.forEach(element => {
                let item: ICheckItems = {
                    name: element.id,
                    completed: false,
                    log: element
                }
                this.task.subtasks.push(item);
            });
        }
    }

    updateAllComplete() {
        this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
    }

    someComplete(): boolean {
        if (this.task.subtasks == null) {
            return false;
        }
        return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
    }

    setAll(completed: boolean) {
        this.allComplete = completed;
        if (this.task.subtasks == null) {
            return;
        }
        this.task.subtasks.forEach(t => t.completed = completed);
    }

    pageChange(event: PageEvent) {
        event.pageIndex++;
        this.paginatorChange.emit(event);
    }

    getCheckedElements(): Array<ILogsStatus> {
        let items = Array<ILogsStatus>();
        this.task.subtasks.forEach(element => {
            if (element.completed) {
                let item: ILogsStatus = {
                    id: element.name
                }
                items.push(item);
            }
        });
        return items;
    }


    setStatus(data:any) {
        
        let items = this.getCheckedElements();
        items.forEach(element => {
            element.status = data;
        });
        this.logService.changeStatus(items).subscribe(() => {
            this.logsChange.emit();
        });
    }
}
