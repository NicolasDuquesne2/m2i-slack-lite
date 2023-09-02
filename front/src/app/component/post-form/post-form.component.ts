import { Component } from '@angular/core';
import { HttpPostService } from 'src/app/service/http-post.service';
import { UserService } from 'src/app/service/user.service';
import { PostForm } from 'src/app/interface/post-form';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent {
  userId: number | null = null;
  isLogged: boolean = false;
  channelId: number | null = null;
  newPostText: string = '';

  constructor(private userService: UserService, private httpPostService: HttpPostService) { }

  ngOnInit(): void {
    this.userService.isLogged.subscribe((observer) => {
      this.isLogged = observer;
    });

    this.userService.userId.subscribe((observer) => {
      this.userId = observer;
    })
  }


  limitText(event: any) {
    const maxLength = 999;
    if (event.target.value.length > maxLength) {
      event.target.value = event.target.value.slice(0, maxLength);
    }
  }

  //   submitPost(){
  //     this.newPostText = '';
  //   }
  submitPost() {
    if (this.newPostText.trim() !== '') {
      const postForm: PostForm = {
        id: null,
        text: this.newPostText,
        user: { id: this.userId },
        channel: { id: this.channelId },
      };

      this.httpPostService.createPost(postForm).subscribe(
        (response) => {
          this.newPostText = '';
        },
        (error) => {
          console.error('Erreur lors de la création de la publication :', error);
        }
      );
    }
  }
}
