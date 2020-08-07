import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { StateService } from '../state/state.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IProject } from '../../interfaces/IProject'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private router: Router, private stateService: StateService) { }

  login(data) {
    const url = `${environment.apiUrl}user/login`;
    this.httpClient.post(url, data).subscribe((response: any) => {
      if (response.meta.code === 0) {
        this.stateService.authorization = response.data.token;
        this.router.navigate(['private', 'logs']);
      }
    });
  }

  logout() {
    const url = `${environment.apiUrl}user/logout`;
    //this.httpClient.get(url).subscribe((response: any) => {
    //  if (response.result === 0) {
    this.stateService.authorization = null;
    this.router.navigate(['login']);
    //  }
    //});
  }

  projects(): Observable<Array<IProject>> {
    const url = `${environment.apiUrl}user/projects`;
    return this.httpClient
    .get<any>(url)
    .pipe(map((res) => {
      if (res.meta.code === 0) {
        return res.data;
      }
      throw (new Error());
    }));
  }

  register(data) {
    const url = `${environment.apiUrl}user`;
    return this.httpClient.post(url, data);
  }

  current() {
    const url = `${environment.apiUrl}user/current`;
    return this.httpClient.get(url);
  }
}
