import { Component, OnInit, Input } from '@angular/core';
import { ILogs } from 'src/app/shared/interfaces/ILogs';

@Component({
  selector: 'app-log-item',
  templateUrl: './log-item.component.html',
  styleUrls: ['./log-item.component.less']
})
export class LogItemComponent implements OnInit {

  @Input() public log: ILogs;
  
  constructor() { }

  ngOnInit(): void {
  }

}
