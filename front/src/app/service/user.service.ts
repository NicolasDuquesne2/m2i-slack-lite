import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user!:User;
  userId!: number;
  isLogged:boolean = false;

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

  getIsLogged(): Observable<boolean>{
    return new Observable<boolean>((observer)=>{
      observer.next(this.isLogged);
    });
  }
}
