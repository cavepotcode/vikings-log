import { Component, Input, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-integration-code',
    templateUrl: './integration-code.component.html',
    styleUrls: ['./integration-code.component.less']
})
export class IntegrationCodeComponent implements OnInit {

    @Input() public name: string;
    public concatenate: string;
    public url = new URL(`${environment.apiUrl}logs/error`);
    
    constructor(private clipboard: Clipboard) {
    }

    ngOnInit(): void {
    }

}
