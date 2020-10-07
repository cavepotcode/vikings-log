import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogTableComponent } from './log-table.component';
import { CommonModule } from '@angular/common';
import { PrivateRouting } from '../../../private-section-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LogTableComponent', () => {
  let component: LogTableComponent;
  let fixture: ComponentFixture<LogTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogTableComponent ],
      imports: [
        CommonModule,
        PrivateRouting,
        LayoutModule,
        SharedModule,
        BrowserAnimationsModule,
        NgxWebstorageModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
