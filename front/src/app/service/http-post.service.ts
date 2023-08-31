import { Injectable } from '@angular/core';
import { BASE_URL } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../interface/post';
import { PostForm } from '../interface/post-form';

@Injectable({
  providedIn: 'root',
})
export class HttpPostService {
  constructor(private http: HttpClient) { }

  // Method to get all Posts
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${BASE_URL}/posts`);
  }

  // Method to get a single Post
  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${BASE_URL}/posts/${id}`);
  }

  // Method to perform a POST of Post
  createPost(postForm: PostForm) {
    const body = {
      text: postForm.text,
      user: postForm.user,
      channel: postForm.channel
    }
    return this.http.post(`${BASE_URL}/posts`, body);
  }

  // Method to update a POST of Post
  partialUpdatePost(postForm: PostForm) {
    const body = {
      id: postForm.id,
      text: postForm.text
    }
    return this.http.patch(`${BASE_URL}/posts/${postForm.id}`, body);
  }

  // Method to delet a POST of Post
  deletPostById(id: number) {
    return this.http.delete(`${BASE_URL}/posts/${id}`);
  }
}
