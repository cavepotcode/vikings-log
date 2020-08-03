import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user/user.service';
import { IProject } from 'src/app/shared/interfaces/IProject';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.less']
})
export class PrivateComponent implements OnInit {

  projects: Array<IProject>;
  user:any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.projects().subscribe((response: any) => {
      this.projects = response;
    });

    this.userService.current().subscribe((response: any) => {
      this.user = response.data;
    });
  }

  logout() {
    this.userService.logout();
  }

}
