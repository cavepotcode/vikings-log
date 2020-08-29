import { Component, OnInit } from '@angular/core';
import { LogService } from '../../services/log/log.service';
import { NotificationService } from '../../../../../../src/app/shared/services/appNotifications/notification-changes.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Subscription } from 'rxjs';
import { Constants } from '../../../../shared/consts/app-constants'
import { ILogs } from 'src/app/shared/interfaces/ILogs';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.less']
})
export class LogComponent implements OnInit {

  public size = 10;
  public page = 1;
  public subscription: Subscription;
  public sub: Subscription;
  public id: string;
  public logs: Array<ILogs> = [];

  constructor(
    private logService: LogService,
    private localSt: LocalStorageService,
    private notifications: NotificationService,
    private route: ActivatedRoute
  ) {
    this.subscription = this.notifications.onNotifications().subscribe(notifications => {
      if (this.isNotificationForMe(notifications)) {
        console.log('getlogs')
        this.getLogs(this.id);
      }
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      this.getLogs(this.id);
    });
  }

  private isNotificationForMe(notification: any) {
    return notification.from === Constants.Private && notification.to === Constants.LOGS
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
    var storedProject = this.id// this.localSt.retrieve('currentProject');
    if (storedProject !== null && storedProject !== '') {
      this.logService.logsByProject(storedProject, this.page, this.size).subscribe((logs) => {
        this.logs = logs;
      });
    }
  }
}
