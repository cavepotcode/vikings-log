import { Component, OnInit } from '@angular/core';
import { LogService } from '../../../services/log/log.service';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.less']
})
export class FilterComponent implements OnInit {
    levelsCode: Array<String>
    constructor(private logService: LogService) { }

    ngOnInit(): void {
        this.getlevelsCode();
    }

    getlevelsCode() {
     this.logService.levelsCode().subscribe((levels:any) => {
        this.levelsCode = levels;
      });
    }
}
