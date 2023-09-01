import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user!:User;
  userId!: number;
  
  private _isLogged = new BehaviorSubject<boolean>(false);
  isLogged = this._isLogged.asObservable();

  constructor() { }

  getUser(): Observable<User>{
    return new Observable<User>((observer)=>{
      observer.next(this.user);
    });
  }

  getUserId(): Observable<number>{
    return new Observable<number>((observer)=>{
      observer.next(this.userId);
    });
  }

  setIsLogged(value: boolean) {
    this._isLogged.next(value);
  }
}
