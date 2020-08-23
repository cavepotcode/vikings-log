import { Observable } from 'rxjs';

export class LocalStorageServiceMock {
    public retrieve(id: string, page: number, size: number): Observable<any> {
        return new Observable((observer) => {
            observer.next("1234");
            observer.complete();
        });
    }
}