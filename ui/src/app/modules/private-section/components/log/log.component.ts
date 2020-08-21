import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user/user.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.less']
})
export class LogComponent implements OnInit {

  public size = 10;
  public page = 1;

  constructor(private userService: UserService, private localSt: LocalStorageService) { }

  ngOnInit() {
    this.getLogs();
  }

  public sizeChange(event: number): void {
    this.size = event;
    this.getLogs();
  }

  public pageChange(event: number): void {
    this.page = event;
    this.getLogs();
  }

  public getLogs(): void {
    var storedProject = this.localSt.retrieve('currentProject');
    if (storedProject !== null && storedProject !== '') {
      this.userService.logsByProject(storedProject, this.page, this.size).subscribe((logs) => {
        console.log(logs);
      });
    }
  }
}
