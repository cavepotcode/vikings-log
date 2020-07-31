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
    this.userService.current().subscribe((response: any) => {
      this.user = response.data;
    });

    this.userService.projects().subscribe((response: any) => {
      console.log(response);
    });
  }

  logout(){
    this.userService.logout();
  }

}
