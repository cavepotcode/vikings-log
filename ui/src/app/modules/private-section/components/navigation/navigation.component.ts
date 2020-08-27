import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { IProject } from '../../../../../../src/app/shared/interfaces/IProject';
import { NotificationService } from 'src/app/shared/services/appNotifications/notification-changes.service';
import { SidenavService } from 'src/app/shared/services/sidenav/sidenav.service';
import { Constants } from 'src/app/shared/consts/app-constants';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less']
})
export class NavigationComponent {

  @Input() public projects: Array<IProject>;
  @Input() public currentProject: string;
  @Output() onLogout: EventEmitter<any> = new EventEmitter();
  @Output() projectSelected: EventEmitter<any> = new EventEmitter();

  @ViewChild('navigationSidenav', { static: true })
  public sidenav: MatSidenav;


  public consts = Constants;
  public projectActionRoutes: Array<any> = [];
  public subscription: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private notifications: NotificationService,
    private commandBarSidenavService: SidenavService) {
    
  }

  public ngOnInit(): void {
    console.log('prjects',this.projects)
    this.commandBarSidenavService.setSidenav(this.sidenav);
    this.subscription = this.notifications.onNotifications().subscribe(notifications => {
      if (this.isNotificationForMe(notifications)) {
        this.sidenav.toggle();
      }
    });
  }


  public projectClick(id: string) {
    console.log('projectClick');
    this.projectSelected.emit(id);
  }

  private isNotificationForMe(notification: any) {
    return notification.from === Constants.Private && notification.to === Constants.NAVIGATION
  }
}
