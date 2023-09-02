import { Component, Input } from '@angular/core';
import { Post } from 'src/app/interface/post';
import { PostForm } from 'src/app/interface/post-form';
import { ChannelService } from 'src/app/service/channel.service';
import { HttpPostService } from 'src/app/service/http-post.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})

export class PostCardComponent {
  @Input() post!: Post;

  userId: number | null = 0;
  isEditing: boolean = false;
  originalText: string = '';


  constructor(private httpPostService: HttpPostService, private userService: UserService, private channelService: ChannelService) { }

  ngOnInit(): void {
    this.userService.userId.subscribe((observer) => {
      this.userId = observer;
    });
  }

  formatedDate(): string {
    let dateFormated = this.post.createdDateTime === this.post.updatedDateTime ? 'Publié le ' : 'Modifié le ';
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    dateFormated += new Date(this.post.updatedDateTime).toLocaleDateString('fr-FR', options);
    return dateFormated;
  }

  startEdit() {
    this.isEditing = true;
    this.originalText = this.post.text;
  }

  closeEdit() {
    this.isEditing = false;
    this.post.text = this.originalText;
  }

  submitEditForm() {
    const postForm: PostForm = { id: this.post.id, text: this.post.text, user: null, channel: null };
    this.post.updatedDateTime = new Date();
    this.httpPostService.partialUpdatePost(postForm).subscribe({
      next: (res) => {
        this.httpPostService.getPostById(this.post.id).subscribe({
          next: (data) => {
            this.post = data;
            this.isEditing = false;
          },
          error: (err) => {
            console.log(err);
          }
        })
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  deletePost() {
    this.httpPostService.deletePostById(this.post.id).subscribe({
      next: (res) => {
        this.httpPostService.getPosts().subscribe({
          next: (data) => {
            this.isEditing = false;
            this.channelService.setPosts(data);
          },
          error: (err) => {
            console.log(err);
          }
        })
      },
      error: (err) => {
        console.log(err);
      }
    });
    console.log(this.post.id);
    
  }

  limitText(event: any, maxLength: number) {
    if (event.target.value.length > maxLength) {
      event.target.value = event.target.value.slice(0, maxLength);
    }
  }
  getAvatarSrc(avatar: string): string {
    if (avatar == null || avatar == undefined) return './assets/img/default-user.svg';
    if (avatar == '') return './assets/img/default-user.svg';
    if (avatar.toLowerCase() == 'avatar') return './assets/img/avatar.webp';
    if (avatar.toLowerCase() == 'eldenring' || avatar.toLowerCase() == 'malenia') return './assets/img/malenia.webp';
    if (!avatar.startsWith('http')) return './assets/img/default-user.svg';
    return avatar;
  }
}
