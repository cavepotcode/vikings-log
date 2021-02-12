import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router } from '@angular/router';
import { IProjectType } from 'src/app/shared/interfaces/IProjectType';
import { ValidateBlanks, validateSize } from 'src/app/shared/validators/custom.validators';
import { LogService } from '../../modules/logs/services/log/log.service';
import { ProjectsService } from '../../services/projects.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ToastrService } from 'ngx-toastr';
import { formatCurrency } from '@angular/common';

@Component({
    selector: 'app-new-project-modal',
    templateUrl: './new-project-modal.component.html',
    styleUrls: ['./new-project-modal.component.less']
})
export class NewProjectModalComponent implements OnInit {
    visible = true;
    selectable = true;
    removable = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    statusCtrl = new FormControl();
    filteredFruits: Observable<string[]>;

    @ViewChild('statusInput') statusInput: ElementRef<HTMLInputElement>;
    @ViewChild('urlInput') urlInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;

    public typeProject: Array<IProjectType> = [];
    projectForm: FormGroup;


    public selectedtype: string;
    statusLog: Array<string>;
    urlsSelected: Array<string> = [];
    urlListArray: FormArray;



    get f() { return this.projectForm.controls; }
    constructor(private formBuilder: FormBuilder, private projectSvc: ProjectsService, private router: Router, private logService: LogService, private toast: ToastrService) { }

    ngOnInit(): void {
        const reg = '(https?://)?([\da-z.-]+)\.([a-z.]{2,6})[/\w .-]*/?';


        this.projectForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            type: [null, Validators.required],
            statusLog: [null,],
            urlList: new FormArray([], [validateSize, this.isNameDup()])

        }, {
            validator: ValidateBlanks('name', 'Project cannot have blanks'),
        }
        );
        this.urlListArray = this.projectForm.get('urlList') as FormArray;
        this.addUrl();
        this.getProjectType();
        this.getStatusLog();
    }

    public submit(): void {
        if (this.urlsSelected.length == 0) {

        }

        this.projectSvc.create({
            apiKey: this.projectForm.value.apikey,
            title: this.projectForm.value.name,
            type: this.projectForm.value.type,
            typeLogStatus: this.statusLog
        }).subscribe((data) => {
            this.router.navigate([`/private/projects/project/${data.data.identifiers[0].id}/logs`]);
        });

    }

    public getProjectType() {
        this.projectSvc.projectType().subscribe((types: any) => {
            this.typeProject = types;
        })
    }

    public getProjectNameErrorMessage() {
        if (this.f.name.errors.required) {
            return 'Project name is required';
        }
        if (this.f.name.errors.cannotContainSpace) {
            return this.f.name.errors.cannotContainSpace;
        }
    }

    public getStatusLog() {
        this.logService.statusLog().subscribe((status: any) => {
            this.statusLog = status.filter(status => status != 'active');
        });
    }
    remove(fruit: string): void {
        if (this.statusLog.length > 2) {
            const index = this.statusLog.indexOf(fruit);

            if (index >= 0) {
                this.statusLog.splice(index, 1);
            }
        } else {
            this.toast.warning('You must choose at least two states for the log')
        }
    }
    add(event: MatChipInputEvent): void {
        if (this.statusLog.includes(event.value.trim().toLowerCase())) {
            this.toast.warning(`Status ${event.value.toUpperCase()} already exist`)
        }
        else {
            const input = event.input;
            const value = event.value;


            if ((value || '').trim()) {
                this.statusLog.push(value.trim().toLowerCase());
            }


            if (input) {
                input.value = '';
            }

            this.statusCtrl.setValue(null);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.statusLog.push(event.option.viewValue);
        this.statusInput.nativeElement.value = '';
        this.statusCtrl.setValue(null);
    }

    addUrl() {
        const group = new FormGroup({
            urlItem: new FormControl('', [Validators.required]),
        });

        this.urlListArray.push(group);
    }
    removeUrl(index: number) {
        if (this.urlListArray.length > 1) {
            this.urlListArray.removeAt(index);
        }
        else {
            this.toast.warning('The list must contain at least one URL')
        }
    }
    isNameDup() {
        const validator: ValidatorFn = (formArray: FormArray) => {
            if (formArray.controls.length >1) {
                const totalSelected = formArray.controls
                    .map(control => control.value);
                    
                const names = totalSelected.map(value => value.urlItem)
                const hasDuplicate = names.some(
                    (name, index) => names.indexOf(name, index + 1) != -1
                );
                if(hasDuplicate){
                    formArray.controls[formArray.controls.length-1].setErrors({duplicateElement: 'Element duplicated'})
                }
                return hasDuplicate ? { duplicate: true } : null;
            }
        }
        return validator;
    }


}
