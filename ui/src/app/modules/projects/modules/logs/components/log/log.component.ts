import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { ILogs } from 'src/app/shared/interfaces/ILogs';
import { ActivatedRoute } from '@angular/router';
import { LogService} from '../../services/log/log.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.less']
})
export class LogDashboardComponent implements OnInit {

  public size = 10;
  public page = 1;
  public subscription: Subscription;
  public sub: Subscription;
  public id: string;
  public logs: Array<ILogs> = [];

  constructor(
    private logService: LogService,
    private route: ActivatedRoute
  ) {
    
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      this.getLogs(this.id);
    });
  }

  public sizeChange(event: number): void {
    this.size = event;
    this.getLogs(this.id);
  }

  public pageChange(event: number): void {
    this.page = event;
    this.getLogs(this.id);
  }

  public getLogs(id: string): void {
    var storedProject = this.id;
    if (storedProject !== null && storedProject !== '') {
      this.logService.logsByProject(storedProject, this.page, this.size).subscribe((logs) => {
        this.logs = logs;
      });
    }
  }
}
