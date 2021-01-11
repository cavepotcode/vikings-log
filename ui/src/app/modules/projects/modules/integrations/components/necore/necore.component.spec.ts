import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NecoreComponent } from './necore.component';

describe('NecoreComponent', () => {
  let component: NecoreComponent;
  let fixture: ComponentFixture<NecoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NecoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NecoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
