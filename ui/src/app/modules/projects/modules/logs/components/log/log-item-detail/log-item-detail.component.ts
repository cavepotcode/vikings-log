import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IException, IHistoryLog } from 'src/app/shared/interfaces/ILogs';


@Component({
    selector: 'app-log-item-detail',
    templateUrl: './log-item-detail.component.html',
    styleUrls: ['./log-item-detail.component.less'],
    
})
export class LogItemDetailComponent implements OnInit {
    @Input() public stack: IException;
    @Input() public info: any;
    @Input() public history: Array<IHistoryLog>;
    @Input() public collapsed :boolean;
    @Output() collapsedChange: EventEmitter<boolean> = new EventEmitter();
    
    constructor() { }

    ngOnInit(): void {
    }

    changeCollapsed(){
        this.collapsed = this.collapsed? false:true;
        this.collapsedChange.emit(this.collapsed)
    }
    
}
