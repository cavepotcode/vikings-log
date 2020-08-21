import { Component, Input, EventEmitter, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { IProject } from '../../../../../../src/app/shared/interfaces/IProject';

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

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) { }

  public projectClick(id:string) {
    this.projectSelected.emit(id);
  }
}
