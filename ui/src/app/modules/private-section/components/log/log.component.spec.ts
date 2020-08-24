import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from '../../../../shared/services/user/user.service';

import { LogComponent } from './log.component';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService, NgxWebstorageModule } from 'ngx-webstorage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { StateService } from 'src/app/shared/services/state/state.service';
import { UserServiceMock } from './mock/user.serviceMock'
import { LocalStorageServiceMock } from './mock/localStorageServiceMock'
import { Observable } from 'rxjs';

describe('LogComponent', () => {
  let component: LogComponent;
  let fixture: ComponentFixture<LogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
        NgxWebstorageModule.forRoot()
      ],
      providers: [
        { provide: UserService, useClass: UserServiceMock }, 
        { provide: LocalStorageService, useClass: LocalStorageServiceMock }
        , StateService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call log service', ()=>{
    const userService = fixture.debugElement.injector.get(UserService);
    const logsSpy = spyOn(userService, 'logsByProject').and.callThrough();    
    component.ngOnInit()
    expect(logsSpy).toHaveBeenCalledTimes(1);
  });

  it('should call log service on size change', ()=>{
    const userService = fixture.debugElement.injector.get(UserService);
    const logsSpy = spyOn(userService, 'logsByProject').and.callThrough();    
    component.pageChange(2)
    expect(logsSpy).toHaveBeenCalledTimes(1);
  });

  it('should call log service on page change', ()=>{
    const userService = fixture.debugElement.injector.get(UserService);
    const logsSpy = spyOn(userService, 'logsByProject').and.callThrough();    
    component.pageChange(2)
    expect(logsSpy).toHaveBeenCalledTimes(1);
  });

});
