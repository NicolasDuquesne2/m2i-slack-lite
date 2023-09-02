import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _isLogged = new BehaviorSubject<boolean>(false);
  isLogged = this._isLogged.asObservable();

  private _userId = new BehaviorSubject<number | null>(null);
  userId = this._userId.asObservable();

  private _user = new BehaviorSubject<User | undefined>(undefined);
  user = this._user.asObservable();

  constructor() { }

  setIsLogged(logged: boolean) {
    this._isLogged.next(logged);
  }

  setUserId(id: number | null){
    this._userId.next(id);
  }

  setUser(user: User | undefined){
    this._user.next(user);
  }
}
