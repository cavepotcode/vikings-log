import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogs } from 'src/app/shared/interfaces/ILogs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private httpClient: HttpClient) { }

  public logsByProject(id: string, page: number, size: number): Observable<Array<ILogs>> {
    const url = `${environment.apiUrl}log/project/${id}`;
    return this.httpClient
      .post(url, { id, page, size })
      .pipe(map((res: any) => {
        if (res.meta.code === 0) {
          return res.data;
        }
        throw (new Error());
      }));
  }
}
