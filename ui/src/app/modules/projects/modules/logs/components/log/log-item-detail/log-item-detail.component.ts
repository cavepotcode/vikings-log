import { Component, Input, OnInit } from '@angular/core';
import { IException } from 'src/app/shared/interfaces/ILogs';

@Component({
    selector: 'app-log-item-detail',
    templateUrl: './log-item-detail.component.html',
    styleUrls: ['./log-item-detail.component.less'],
    
})
export class LogItemDetailComponent implements OnInit {
    @Input() public stack: IException;
    @Input() public info: any;
    
    public collapsed =false;

    constructor() { }

    ngOnInit(): void {
    }

}
