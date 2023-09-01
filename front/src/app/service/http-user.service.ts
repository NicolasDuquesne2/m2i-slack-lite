import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../config/config';
import { Observable } from 'rxjs';
import { User } from '../interface/user';
import { UserForm } from '../interface/user-form';
import { UserLogged } from '../interface/user-logged';

@Injectable({
  providedIn: 'root',
})
export class HttpUserService {
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${BASE_URL}/users`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${BASE_URL}/users/${id}`);
  }

  createUser(userForm: UserForm) {
    const body = {
      name: userForm.name,
      email: userForm.email,
      password: userForm.password,
    }
    return this.http.post(`${BASE_URL}/users/signup`, body);
  }

  loginUser(userForm: UserForm):Observable<UserLogged | any> {
    const body = {
      email: userForm.email,
      password: userForm.password,
    }
    return this.http.post(`${BASE_URL}/users/login`, body);
  }

  partialUpdateUser(userForm: UserForm) {
    const body = {
      id: userForm.id,
      name: userForm.name,
      email: userForm.email,
      password: userForm.password,
      avatar: userForm.avatar
    }
    return this.http.patch(`${BASE_URL}/users/${userForm.id}`, body);
  }

  deleteUserById(id: number) {
    return this.http.delete(`${BASE_URL}/users/${id}`);
  }
}
