import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.less']
})
export class IntegrationComponent implements OnInit {
  public baseUrl = new URL(`${environment.apiUrl}`);
  
  constructor() { }

  ngOnInit(): void {
  }

}
