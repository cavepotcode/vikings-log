import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { IProject } from '../../../../../../src/app/shared/interfaces/IProject';
import { NotificationService } from 'src/app/shared/services/appNotifications/notification-changes.service';
import { SidenavService } from 'src/app/shared/services/sidenav/sidenav.service';
import { Constants } from 'src/app/shared/consts/app-constants';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { NewProjectModalComponent } from 'src/app/modules/projects/components/new-project-modal/new-project-modal.component';

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
    @Output() projectNew: EventEmitter<any> = new EventEmitter();

    @ViewChild('navigationSidenav', { static: true })
    public sidenav: MatSidenav;


    public constants = Constants;
    public projectActionRoutes: Array<any> = [
        {
            route: 'projects/create',
            icon: '',
            title: 'Add Project'
        }
    ];
    public subscription: Subscription;

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );

    constructor(
        private breakpointObserver: BreakpointObserver,
        private commandBarSidenavService: SidenavService,
        private dialog: MatDialog) {

    }

    public ngOnInit(): void {
        console.log('prjects', this.projects)
        this.commandBarSidenavService.setSidenav(this.sidenav);
    }


    public projectClick(id: string) {
        this.projectSelected.emit(id);
    }

    public openAddProjectDialog() {
        const dialogRef = this.dialog.open(NewProjectModalComponent, {
            height: '320px',
            width: '600px'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.projectNew.emit();
            }
        });
    }
}
