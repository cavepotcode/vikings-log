import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { StateService } from '../state/state.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IProject } from '../../interfaces/IProject'
import { ILogs } from '../../interfaces/ILogs'
import { ICreateUser, IUser, IUserWithOutPassword } from '../../interfaces/IUser'

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
                this.router.navigate(['private']);
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

    projects(text: string): Observable<Array<IProject>> {
        const url = `${environment.apiUrl}user/projects`;
        let params = new HttpParams();
        if (text) {
            params = params.append('text', text);
        }
        return this.httpClient
            .get<any>(url, { params })
            .pipe(map((res) => {
                if (res.meta.code === 0) {
                    if (res.data) {
                        return res.data.map((p) => {
                            return {
                                route: `projects/project/${p.id}/logs`,
                                icon: 'assignment',
                                title: p.name,
                                id: p.id,
                                apiKey: p.apiKey,
                                countLogs: p.countLogs
                            }
                        });;
                    }
                    else {
                        return [];
                    }
                }
                throw (new Error());
            }));
    }

    public logsByProject(id: string, page: number, size: number): Observable<Array<ILogs>> {
        const url = `${environment.apiUrl}logs/project/${id}`;
        return this.httpClient
            .post(url, { id, page, size })
            .pipe(map((res: any) => {
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

    
    public getUsers(): Observable<Array<IUserWithOutPassword>> {
        const url = `${environment.apiUrl}user/users`;
        return this.httpClient
            .get<any>(url)
            .pipe(map((res) => {
                if (res.meta.code === 0) {
                    return res.data;
                }
                throw (new Error());
            }));
    }
    public createUser(user:ICreateUser) {
        const url = `${environment.apiUrl}user/user`;
        return this.httpClient.post(url,user)
        .pipe(map((res: any) => {
            if (res.meta.code === 0) {
                return res.data;
            }
            throw (new Error());
        }));
    }
    public updateUser(id:string, user:IUserWithOutPassword) {
        const url = `${environment.apiUrl}user/${id}`;
        return this.httpClient.put(url,user)
        .pipe(map((res: any) => {
            if (res.meta.code === 0) {
                return res.data;
            }
            throw (new Error());
        }));
    }
    public getUser(id:string): Observable<IUserWithOutPassword> {
        const url = `${environment.apiUrl}user/user/${id}`;
        return this.httpClient
            .get<any>(url)
            .pipe(map((res) => {
                if (res.meta.code === 0) {
                    return res.data;
                }
                throw (new Error());
            }));
    }
    
    public deleteUser(id:string) {
        const url = `${environment.apiUrl}user/user/${id}`;
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
