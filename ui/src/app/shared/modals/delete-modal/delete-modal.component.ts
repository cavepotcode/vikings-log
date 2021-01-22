import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.less']
})
export class DeleteModalComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: { text: string }) {
    
    }
    ngOnInit(): void {
    }
}
