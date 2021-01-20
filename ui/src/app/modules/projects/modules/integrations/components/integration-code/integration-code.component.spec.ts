import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationCodeComponent } from './integration-code.component';

describe('IntegrationCodeComponent', () => {
  let component: IntegrationCodeComponent;
  let fixture: ComponentFixture<IntegrationCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegrationCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrationCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
