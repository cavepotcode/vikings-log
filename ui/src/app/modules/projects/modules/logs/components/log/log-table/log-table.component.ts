import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import { ILogs } from 'src/app/shared/interfaces/ILogs';

@Component({
  selector: 'app-log-table',
  templateUrl: './log-table.component.html',
  styleUrls: ['./log-table.component.less']
})
export class LogTableComponent implements OnInit {
  pageSizeOptions = [2, 5, 10]
  pageEvent: PageEvent;
  @Input() public logs: Array<ILogs>;
  @Input() public  pageSize;
  @Input() public  length;
  @Output() paginatorChange = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  pageChange(event: PageEvent){
    event.pageIndex++;
    this.paginatorChange.emit(event);
  }

}
