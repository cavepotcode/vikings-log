import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../../../shared/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  @Input() public user: any;

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
