import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Constants } from 'src/app/shared/consts/app-constants';
import { ILogsFilter } from 'src/app/shared/interfaces/ILogs';
import { IProject } from 'src/app/shared/interfaces/IProject';
import { LogService } from '../../../services/log/log.service';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.less']
})
export class FilterComponent implements OnInit {
    @Output() filterChange = new EventEmitter();
    @Input() project :IProject
    levelsCode: Array<String>;
    
    selectedlevel: string;
    selectedkey: string;
    selectedDateFrom: string;
    selectedDateTo: string;
    selectedStatusLog: string;
    constructor(private logService: LogService) { }

    ngOnInit(): void {
        this.getlevelsCode();
    }

    public getlevelsCode() {
        this.logService.levelsCode().subscribe((levels: any) => {
            this.levelsCode = levels;
        });
    }

  public onKey(event: any) {
        let lettercount = event.target.value.length;
        if (lettercount > 2) {
            this.selectedkey = event.target.value;
            this.filter();
        }
        if (lettercount == 0) {
            this.selectedkey = '';
            this.filter();
        }

    }

    public selectedDates() {
        if (this.selectedDateFrom && this.selectedDateTo) {
            this.filter();
        }
    }

    public filter() {
        const filter: ILogsFilter = {
            level: this.selectedlevel,
            text: this.selectedkey,
            status: this.selectedStatusLog

        }
        if (this.selectedDateFrom && this.selectedDateTo) {
            filter['dateFrom'] = this.selectedDateFrom;
            filter['dateTo'] = this.selectedDateTo;
        }

        this.filterChange.emit(filter);
    }
    public clearFilter() {
        this.selectedlevel = '';
        this.selectedkey = '';
        this.selectedDateFrom = '';
        this.selectedDateTo = '';
        this.selectedStatusLog = '';
        this.filter();
    }

}
