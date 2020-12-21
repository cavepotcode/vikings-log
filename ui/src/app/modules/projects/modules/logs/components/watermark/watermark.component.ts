import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-watermark',
    templateUrl: './watermark.component.html',
    styleUrls: ['./watermark.component.less']
})
export class WatermarkComponent implements OnInit {

    @Input() public icon: string;
    @Input() public message: string;
    constructor() { }

    ngOnInit(): void {
        console.log(`${this.icon} + ${this.message}`)
    }

}
