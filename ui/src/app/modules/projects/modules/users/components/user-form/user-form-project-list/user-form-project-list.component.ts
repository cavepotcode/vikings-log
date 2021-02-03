import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ICheckProyectItems } from 'src/app/shared/interfaces/ICheckItems';
import { IProjectItem } from 'src/app/shared/interfaces/IProject';


@Component({
    selector: 'app-user-form-project-list',
    templateUrl: './user-form-project-list.component.html',
    styleUrls: ['./user-form-project-list.component.less']
})
export class UserFormProjectListComponent implements OnInit {
    @Input() public items: Array<IProjectItem>;
    @Input() public itemsSelected: Array<IProjectItem>;
    @Output() newProjectSelected: EventEmitter<any> = new EventEmitter();
    displayedColumns: string[] = ['name', 'type', 'button'];
    dataSource = new MatTableDataSource<IProjectItem>();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    public filter: boolean;
    selectedkey: string;


    constructor() { }
    ngOnInit(): void {
        
    }
    

    ngOnChanges(changes: SimpleChanges) {
        if (changes.hasOwnProperty('items')) {
            this.loadDifferenceSelected()
        }
        if (changes.hasOwnProperty('itemsSelected')) {
            this.loadDifferenceSelected()
        }
    }
    public remove(item: IProjectItem): void {
        const index = this.itemsSelected.indexOf(item);
        if (index >= 0) {
            this.itemsSelected.splice(index, 1);
            this.loadDifferenceSelected();
            this.newProjectSelected.emit(this.itemsSelected);
        }
    }
    public removeAll() {
        this.itemsSelected = [];
        this.loadDifferenceSelected();
        this.newProjectSelected.emit(this.itemsSelected);
    }

    public onKey(event: any) {
        let lettercount = event.target.value.length;
        if (lettercount > 0) {
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
            this.loadDifferenceSelected();
        }
        else {
            this.filter = false;
            this.loadFilterSelectedKey();
        }
    }

    public selectProject(row: IProjectItem) {
        this.filter = true;
        this.itemsSelected.push(row);
        this.newProjectSelected.emit(this.itemsSelected);
        this.loadFilterSelectedKey();
    }

    public selectAll() {
        this.filter = true;
        this.itemsSelected = this.items;
        this.newProjectSelected.emit(this.itemsSelected);
    }
    public loadDifferenceSelected() {
            const diffprojects = this.items.filter(this.comparer(this.itemsSelected));
            this.dataSource = new MatTableDataSource(diffprojects);
    }
    public loadFilterSelectedKey() {
        const diffprojects = this.items.filter(this.comparer(this.itemsSelected));
        this.dataSource = new MatTableDataSource(diffprojects.filter(item => item.name?.toLocaleLowerCase().match(this.selectedkey?.toLocaleLowerCase())));
    }

    public comparer(otherArray: IProjectItem[]) {
        return (current) => {
            return otherArray.filter(function (other) {
                return other.id == current.id;
            }).length == 0;
        }
    }
}
