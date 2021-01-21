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
import { DeleteProjectModalComponent } from 'src/app/modules/projects/components/delete-project-modal/delete-project-modal.component';
import { Router } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';
import { ToastrService } from 'ngx-toastr';

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
    selectedkey: string;
    filter:boolean;
    

    constructor(
        private breakpointObserver: BreakpointObserver,
        private commandBarSidenavService: SidenavService,
        private dialog: MatDialog,
        private router: Router,
        private clipboard: Clipboard,
        private toast: ToastrService) {

    }

    public ngOnInit(): void {

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
    public openDeleteProjectDialog(id: string, title: string) {
        const dialogRef = this.dialog.open(DeleteProjectModalComponent, {
            height: '150px',
            width: '600px',
            data: { id: id, name: title },
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.projectNew.emit();
                if (this.router.url === `/private/projects/project/${id}/logs`) {
                    this.router.navigate(['private']);
                }
            }
        });
    }

    public openIntegrations() {
        this.router.navigate(['/private/projects/integrations']);
    }
    public copyItem(appkey: string) {
        this.clipboard.copy(appkey);
        this.toast.info('APP-KEY has been copied');
    }

    public onKey(event: any) {
        let lettercount = event.target.value.length;
        if (lettercount > 2) {
            this.selectedkey = event.target.value;
            this.filterProjects();
        }
        if (lettercount == 0) {
            this.selectedkey = '';
            this.filterProjects();
        }

    }

    public filterProjects(){
        if(!this.selectedkey){
            this.filter = false;
            return this.projects;
        }
        else{
            this.filter = true;
            return this.projects.filter(item => item.title.match(this.selectedkey))
        }
        return [];
    }

}
