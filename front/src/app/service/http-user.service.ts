import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { BASE_URL } from '../config/config';
import { Observable } from 'rxjs';
import { User } from '../interface/user';
import { UserForm } from '../interface/user-form';

@Injectable({
  providedIn: 'root',
})
export class HttpUserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${BASE_URL}/users`);
  }

  getUserById(id: number): Observable<User>{
    return this.http.get<User>(`${BASE_URL}/users/${id}`);
  }

  createUser(user: UserForm){
    const body = {
      name: user.name,
      email: user.email,
      password: user.password,
    }
    return this.http.post(`${BASE_URL}/users/signup`, body);
  }

  loginUser(user: UserForm){
    const body = {
      email: user.email,
      password: user.password,
    }
    return this.http.post(`${BASE_URL}/users/login`, body);
  }

  partialUpdateUser(user: UserForm){
    const body = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      avatar: user.avatar
    }
    return this.http.patch(`${BASE_URL}/users/${user.id}`, body);
  }

  deleteUserById(id: number){
    return this.http.delete(`${BASE_URL}/users/${id}`);
  }
}
