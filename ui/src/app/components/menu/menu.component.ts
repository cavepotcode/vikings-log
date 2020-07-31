import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../../src/app/shared/services/user/user.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {
  user: any;
  constructor(private userService: UserService) { }

  ngOnInit(): void {

  }

  logout() {
    this.userService.logout();
  }

  get username() {
    return this.user ? this.user.email : "";
  };
}
