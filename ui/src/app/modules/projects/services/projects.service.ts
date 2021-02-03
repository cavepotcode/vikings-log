import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProject, IProjectItem } from 'src/app/shared/interfaces/IProject';
import { IProjectType } from 'src/app/shared/interfaces/IProjectType';
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

    public projectsList(): Observable<Array<IProjectItem>> {
        const url = `${environment.apiUrl}project/`;
        return this.httpClient
            .get<any>(url)
            .pipe(map((res) => {
                if (res.meta.code === 0) {
                    return res.data.map((p) => {
                        return {
                            id: p.id,
                            name: p.name,
                            apiKey: p.apiKey,
                            type: p.type
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


    public projectType(): Observable<Array<IProjectType>> {
        const url = `${environment.apiUrl}generic/projects`;
        return this.httpClient
            .get(url)
            .pipe(map((res: any) => {
                if (res.meta.code === 0) {
                    return res.data;
                }
                throw (new Error());
            }));
    }

    public deleteProject(id: string): Observable<any> {
        const url = `${environment.apiUrl}project/${id}`;
        return this.httpClient
            .delete<any>(url)
            .pipe(map((res) => {
                if (res.meta.code === 0) {
                    return res.data;
                }
                throw (new Error());
            }));

    }

}
