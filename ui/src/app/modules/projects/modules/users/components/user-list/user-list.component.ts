import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUser, IUserWithOutPassword } from 'src/app/shared/interfaces/IUser';
import { DeleteModalComponent } from 'src/app/shared/modals/delete-modal/delete-modal.component';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.less']
})

export class UserListComponent implements OnInit {
    displayedColumns: string[] = ['username', 'email', 'role', 'projets', 'button-update', 'button-delete'];
    public users: Array<IUserWithOutPassword>
    dataSource: MatTableDataSource<IUserWithOutPassword>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private userService: UserService, private router: Router, private dialog: MatDialog, private toastService: ToastrService) {
    }


    ngOnInit(): void {
        this.getUsers()
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    getUsers() {
        this.userService.getUsers().subscribe(users => {
            this.dataSource = new MatTableDataSource(users);
        })
    }

    public updateUser(id: string) {
        this.router.navigate([`/private/projects/users/form/${id}`]);
    }
    public GenerateUser() {
        this.router.navigate([`/private/projects/users/form`]);
    }
    
    public openDeleteDialog(row: any) {
        const dialogRef = this.dialog.open(DeleteModalComponent, {
            height: '150px',
            width: '600px',
            data: { text: `Are you sure you want to delete "${row.username.toUpperCase()}" user` },
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.userService.deleteUser(row.id).subscribe(result => {
                    this.toastService.success('User has been remove succesfuly');
                    this.getUsers();
                });
            }
        });
    }

}