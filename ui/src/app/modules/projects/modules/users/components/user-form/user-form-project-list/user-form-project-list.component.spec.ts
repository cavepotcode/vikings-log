import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormProjectListComponent } from './user-form-project-list.component';

describe('UserFormProjectListComponent', () => {
  let component: UserFormProjectListComponent;
  let fixture: ComponentFixture<UserFormProjectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFormProjectListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
