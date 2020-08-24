import { Injectable } from '@angular/core';


export class StateService {
  private AUTHORIZATION = 'VIKINGS_LOG_AUTHORIZATION';

  get authorization() { return localStorage.getItem(this.AUTHORIZATION); }
  set authorization(value) { localStorage.setItem(this.AUTHORIZATION, value); }

  constructor() { }
}
