import { Observable } from 'rxjs';
import { ILogs } from '../../../../../shared/interfaces/ILogs'
import { IProject } from '../../../../../shared/interfaces/IProject'
import { IUser } from '../../../../../shared/interfaces/IUser'

export class UserServiceMock {
    public logsByProject(id: string, page: number, size: number): Observable<Array<ILogs>> {
        return new Observable((observer) => {
            observer.next([{
                date: "1-1-2020",
                id: "1",
                level: "danger",
                message: "error",
                project: "sarasa",
                stackTrace: "stackTraceMessage"
            }]);
            observer.complete();
        });
    }

    public projects(): Observable<Array<IProject>> {
        return new Observable((observer) => {
            observer.next([{
                apiKey: 'apikey',
                id: 'id',
                title: 'test',
                icon:'',
                route:''
            }]);
            observer.complete();
        });
    }

    public current(): Observable<IUser> {
        return new Observable((observer) => {
            observer.next({
                email: 'test@test.com',
                exp: 1234,
                iat: 1234,
                id: 'id',
                username: 'test'
            });
            observer.complete();
        });
    }
}
