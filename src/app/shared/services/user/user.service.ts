import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private _currentUser: BehaviorSubject<any>
  ) { }

  set currentUser(userDetails: any) {
    this._currentUser = new BehaviorSubject({});
    this._currentUser.next(userDetails);
  }

  get currentUser() {
    return this._currentUser.subscribe();
  }
}
