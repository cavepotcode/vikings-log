import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogItemDetailComponent } from './log-item-detail.component';

describe('LogItemDetailComponent', () => {
  let component: LogItemDetailComponent;
  let fixture: ComponentFixture<LogItemDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogItemDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
