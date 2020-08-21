import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateComponent } from './private.component';
import { SharedModule } from '../../../../../../src/app/shared/shared.module';
import { PrivateRouting } from '../../private-section-routing.module';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { NgxWebstorageModule, LocalStorageService } from 'ngx-webstorage';
import { UserService } from 'src/app/shared/services/user/user.service';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { StateService } from 'src/app/shared/services/state/state.service';
import { ToastrModule } from 'ngx-toastr';

describe('PrivateComponent', () => {
  let component: PrivateComponent;
  let fixture: ComponentFixture<PrivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrivateComponent],
      imports: [
        CommonModule,
        PrivateRouting,
        LayoutModule,
        SharedModule,
        NgxWebstorageModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
        ToastrModule.forRoot(),
      ],
      providers: [UserService, LocalStorageService, StateService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
