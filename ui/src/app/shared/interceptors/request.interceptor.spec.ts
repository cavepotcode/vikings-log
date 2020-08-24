import { TestBed } from '@angular/core/testing';

import { RequestInterceptor } from './request.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { StateService } from '../services/state/state.service';

describe('RequestInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      ToastrModule.forRoot(),
      FormsModule,
      ReactiveFormsModule,
      RouterTestingModule,
      HttpClientModule,
    ],
    providers: [
      RequestInterceptor, StateService
    ]
  }));

  it('should be created', () => {
    const interceptor: RequestInterceptor = TestBed.inject(RequestInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
