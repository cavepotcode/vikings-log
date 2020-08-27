import { Component, OnInit } from '@angular/core';
import { LogService } from '../../services/log/log.service';
import { NotificationService } from '../../../../../../src/app/shared/services/appNotifications/notification-changes.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Subscription } from 'rxjs';
import { Constants } from '../../../../shared/consts/app-constants'
import { ILogs } from 'src/app/shared/interfaces/ILogs';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.less']
})
export class LogComponent implements OnInit {

  public size = 10;
  public page = 1;
  public subscription: Subscription;
  public logs:Array<ILogs> = [];

  constructor(
    private logService: LogService,
    private localSt: LocalStorageService,
    private notifications: NotificationService
  ) {
    this.subscription = this.notifications.onNotifications().subscribe(notifications => {
      if(this.isNotificationForMe(notifications)){
        this.getLogs();
      }
    });
  }

  ngOnInit() {
    this.getLogs();
  }

  private isNotificationForMe(notification: any) {
    return notification.from === Constants.Private && notification.to === Constants.LOGS
  }

  public sizeChange(event: number): void {
    this.size = event;
    this.getLogs();
  }

  public pageChange(event: number): void {
    this.page = event;
    this.getLogs();
  }

  public getLogs(): void{
    var storedProject = this.localSt.retrieve('currentProject');
    if (storedProject !== null && storedProject !== '') {
      this.logService.logsByProject(storedProject, this.page, this.size).subscribe((logs) => {
        this.logs = logs;
      });
    }
  }
}
