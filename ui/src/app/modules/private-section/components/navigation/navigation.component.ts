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
import { Router } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';
import { ToastrService } from 'ngx-toastr';
import { Socket } from 'ngx-socket-io';
import { StateService } from 'src/app/shared/services/state/state.service';
import { TokenService } from 'src/app/shared/services/token/token.service';
import { ProjectsService } from 'src/app/modules/projects/services/projects.service';
import { DeleteModalComponent } from 'src/app/shared/modals/delete-modal/delete-modal.component';

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

    filter: boolean = false;

    constructor(
        private breakpointObserver: BreakpointObserver,
        private commandBarSidenavService: SidenavService,
        private dialog: MatDialog,
        private router: Router,
        private clipboard: Clipboard,
        private toast: ToastrService,
        private socket: Socket,
        private projectsService: ProjectsService,
        private tokenService: TokenService) {
    }

    public ngOnInit(): void {
        this.commandBarSidenavService.setSidenav(this.sidenav);
        this.socket.on('new-logs', (projectid: string) => {
            this.logAdded(projectid);
        })
    }

    public logAdded(projectId: string) {
        this.projects.find(item => item.id == projectId).countLogs++;
        this.socket.on('new-logs',(projectid: string)=>{
            this.logAdded(projectid);
        })
    }
   
    public logAdded(projectId: string){
        this.projects.find(item=>item.id == projectId).countLogs++;
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
        const dialogRef = this.dialog.open(DeleteModalComponent, {
            height: '150px',
            width: '600px',
            data: { text: `Are you sure you want to delete "${title.toUpperCase()}" project` },
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.projectsService.deleteProject(id).subscribe((data) => {
                    this.projectNew.emit();
                    if (this.router.url === `/private/projects/project/${id}/logs`) {
                        this.router.navigate(['private']);
                    }
                });
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

    public filterProjects() {
        if (!this.selectedkey) {
            this.filter = false;
            return this.projects;
        }
        else {
            this.filter = true;
            return this.projects.filter(item => item.title.match(this.selectedkey))
        }
    }
    public isAdmin() {
        return this.tokenService.isAdmin();
    }
}
