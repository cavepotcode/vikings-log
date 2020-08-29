import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../../../src/app/shared/services/user/user.service';
import { IProject } from '../../../../../../src/app/shared/interfaces/IProject';
import { LocalStorageService } from 'ngx-webstorage';
import { NotificationService } from '../../../../../../src/app/shared/services/appNotifications/notification-changes.service';
import { Constants } from 'src/app/shared/consts/app-constants';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscribable } from 'rxjs';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.less']
})
export class PrivateComponent implements OnInit {

  defaultProject: string = '';
  projects: Array<IProject>;
  user: any;
  sub: any;
  id: any;

  constructor(
    private userService: UserService,
    private localSt: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userService.projects().subscribe((response: any) => {
      console.log('response projects', response);
      this.projects = response;
      var storedProject = this.localSt.retrieve('currentProject');
      this.defaultProject = storedProject === null ? this.projectChange(this.projects[0].id) : storedProject;
      this.router.navigate(['/private/logs', this.projects[0].id]);
    });

    this.userService.current().subscribe((response: any) => {
      this.user = response.data;
    });
  }

  public projectChange(event: string): void {
    this.defaultProject = event;
    this.localSt.store('currentProject', this.defaultProject);
  }

}
