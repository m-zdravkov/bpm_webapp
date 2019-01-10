import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LocalStorageService {
  itemValue = new Subject();
  registrationUserSubject = new Subject();

  set accessToken(value) {
    const val = JSON.stringify(value);
    console.log(val);
    this.itemValue.next(value); // this will make sure to tell every subscriber about the change.
    localStorage.setItem('accessToken', val);
  }

  get accessToken() {
    return JSON.parse(localStorage.getItem('accessToken'));
  }
  set registrationUser(value) {
    const val = JSON.stringify(value);
    this.registrationUserSubject.next(value);
    localStorage.setItem('currentUser', val);
  }

  get registrationUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
}
