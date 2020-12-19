import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ILogsFilter } from 'src/app/shared/interfaces/ILogs';
import { LogService } from '../../../services/log/log.service';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.less']
})
export class FilterComponent implements OnInit {
    @Output() filterChange = new EventEmitter();
    levelsCode: Array<String>;
    selectedlevel: string;
    selectedkey: string;
    selectedDateFrom: string;
    selectedDateTo: string;
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
        this.selectedkey = event.target.value;
        if (this.selectedkey.length > 2) {
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
            text: this.selectedkey
        }
        if (this.selectedDateFrom && this.selectedDateTo) {
            filter['dateFrom'] = this.selectedDateFrom;
            filter['dateTo'] = this.selectedDateTo;
        }
        console.log(filter);
        this.filterChange.emit(filter);
    }

}
