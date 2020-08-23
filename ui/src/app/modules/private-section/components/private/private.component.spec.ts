import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateComponent } from './private.component';
import { SharedModule } from '../../../../../../src/app/shared/shared.module';
import { PrivateRouting } from '../../private-section-routing.module';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { NgxWebstorageModule, LocalStorageService } from 'ngx-webstorage';
import { UserService } from 'src/app/shared/services/user/user.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { StateService } from 'src/app/shared/services/state/state.service';
import { ToastrModule } from 'ngx-toastr';
import { UserServiceMock } from './mocks/user.serviceMock';
import { LocalStorageServiceMock } from './mocks/localStorageServiceMock';
import { NotificationService } from '../../../../../../src/app/shared/services/appNotifications/notification-changes.service';

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
      providers: [
        { provide: UserService, useClass: UserServiceMock },
        { provide: LocalStorageService, useClass: LocalStorageServiceMock },
        NotificationService,
        StateService]
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

  it('should initialize calling services', () => {
    const userService = fixture.debugElement.injector.get(UserService);
    const currentSpy = spyOn(userService, 'current').and.callThrough();
    const projectSpy = spyOn(userService, 'projects').and.callThrough();  
    component.ngOnInit();
    expect(currentSpy).toHaveBeenCalledTimes(1);
    expect(projectSpy).toHaveBeenCalledTimes(1);
  });
});
