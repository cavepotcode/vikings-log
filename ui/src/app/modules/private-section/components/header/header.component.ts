import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../../shared/services/user/user.service';
import { Constants } from 'src/app/shared/consts/app-constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  @Input() public user: any;

  public constants = Constants;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  get username() {
    return this.user ? this.user.email : '';
  }

  logout() {
    this.userService.logout();
  }

}
