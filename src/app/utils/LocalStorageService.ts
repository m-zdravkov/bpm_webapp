import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LocalStorageService {
  itemValue = new Subject();

  set accessToken(value) {
    const val = JSON.stringify(value);
    this.itemValue.next(value); // this will make sure to tell every subscriber about the change.
    localStorage.setItem('accessToken', val);
  }

  get accessToken() {
    return JSON.parse(localStorage.getItem('accessToken'));
  }
}
