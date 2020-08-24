import { TestBed } from '@angular/core/testing';

import { NotificationChangesService } from './notification-changes.service';

describe('NotificationChangesService', () => {
  let service: NotificationChangesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationChangesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
