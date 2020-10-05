import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProject } from 'src/app/shared/interfaces/IProject';
import { environment } from 'src/environments/environment';
import { StateService } from 'src/app/shared/services/state/state.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private httpClient: HttpClient, private router: Router, private stateService: StateService) { }

  public projects(): Observable<Array<IProject>> {
    const url = `${environment.apiUrl}user/projects`;
    return this.httpClient
      .get<any>(url)
      .pipe(map((res) => {
        if (res.meta.code === 0) {
          return res.data.map((p) => {
            return {
              route: `projects/project/${p.id}/logs`,
              icon: 'assignment',
              title: p.name,
              id: p.id,
              apiKey: p.apiKey
            }
          });;
        }
        throw (new Error());
      }));
  }

  public create(project: IProject): Observable<any> {
    const url = `${environment.apiUrl}user/projects`;
    return this.httpClient
      .post<any>(url, project);
  }
}
