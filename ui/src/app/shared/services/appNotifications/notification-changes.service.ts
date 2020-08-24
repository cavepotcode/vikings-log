import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private subject = new Subject<any>();

  sendNotification(notification: any) {
    this.subject.next(notification);
  }

  clearNotificatoins() {
    this.subject.next();
  }

  onNotifications(): Observable<any> {
    return this.subject.asObservable();
  }
}