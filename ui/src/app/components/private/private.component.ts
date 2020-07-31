import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../src/app/shared/services/user/user.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.less']
})
export class PrivateComponent implements OnInit {
  projects: any;
  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.projects().subscribe((response: any) => {
      this.projects = response.data;
    });

  }


}
