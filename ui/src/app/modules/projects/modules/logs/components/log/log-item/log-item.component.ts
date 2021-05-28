import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICheckItems } from 'src/app/shared/interfaces/ICheckItems';

@Component({
    selector: 'app-log-item',
    templateUrl: './log-item.component.html',
    styleUrls: ['./log-item.component.less']
})
export class LogItemComponent implements OnInit {

    @Input() public log: ICheckItems;
    @Input() public even: boolean=false;
    @Output() public allComplete: EventEmitter<any> = new EventEmitter();
    public collapsed: boolean;
    constructor() { }

    ngOnInit(): void {

    }
    updateAllComplete() {
        this.allComplete.emit();
    }
    changeCollapsed(data: boolean){
        this.collapsed = data;
    }
}
