import { Component, OnInit, Input } from '@angular/core';
import { ILogs } from 'src/app/shared/interfaces/ILogs';

@Component({
  selector: 'app-log-table',
  templateUrl: './log-table.component.html',
  styleUrls: ['./log-table.component.less']
})
export class LogTableComponent implements OnInit {

  @Input() public logs: Array<ILogs>;

  constructor() { }

  ngOnInit(): void {
  }

}
