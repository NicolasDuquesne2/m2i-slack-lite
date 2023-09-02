
import { Component, Input } from '@angular/core';
import { HttpPostService } from 'src/app/service/http-post.service';
import { UserService } from 'src/app/service/user.service';
import { PostForm } from 'src/app/interface/post-form';
import { Observable } from 'rxjs';
import { ChannelService } from 'src/app/service/channel.service';


@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent {
  @Input() channelId!: number;

  userId: number | null = null;
  isLogged: boolean = false;
  newPostText: string = '';

  constructor(private userService: UserService, private httpPostService: HttpPostService, private channelService: ChannelService) { }

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
          this.httpPostService.getPosts().subscribe({
            next: (data) => {
              this.channelService.setPosts(data)
            },
            error: (err) => {
              console.log(err);
            }
          })
        },
        (error) => {
          console.error('Erreur lors de la création de la publication :', error);
        }
      );
    }
  }
}
