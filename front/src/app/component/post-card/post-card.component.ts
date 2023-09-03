import { Component, Input } from '@angular/core';
import { Post } from 'src/app/interface/post';
import { PostForm } from 'src/app/interface/post-form';
import { User } from 'src/app/interface/user';
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
  displayModal: boolean = false;
  isUpdateError: boolean = false;
  isDeleteError: boolean = false;

  constructor(private httpPostService: HttpPostService, private userService: UserService, private channelService: ChannelService) { }

  ngOnInit(): void {
    this.userService.userId.subscribe((observer) => {
      this.userId = observer;
    });

    if(this.post != null && this.post.user == null){
      const deletedUser: User = {
        id : 0,
        name: 'Utilisateur supprimé',
        avatar: ''
      }

      this.post.user = deletedUser;
    }
  }

  formatedDate(): string {
    let dateFormated = this.post.createdDateTime === this.post.updatedDateTime ? 'Publié le ' : 'Modifié le ';
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    dateFormated += new Date(this.post.updatedDateTime).toLocaleDateString('fr-FR', options);
    return dateFormated;
  }

  startEdit() {
    this.isUpdateError=false;
    this.isEditing = true;
    this.originalText = this.post.text;
  }

  closeEdit() {
    this.isUpdateError=false;
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
            this.isUpdateError = true;
          }
        })
      },
      error: (err) => {
        this.isUpdateError = true;
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
            this.isDeleteError = true;
          }
        })
      },
      error: (err) => {
        this.isDeleteError = true;
      }
    });
  }

  getAvatarSrc(avatar: string): string {
    if (avatar == null || avatar == undefined) return './assets/img/default-user.svg';
    if (avatar == '') return './assets/img/default-user.svg';
    if (avatar.toLowerCase() == 'avatar') return './assets/img/avatar.webp';
    if (avatar.toLowerCase() == 'eldenring' || avatar.toLowerCase() == 'malenia') return './assets/img/malenia.webp';
    if (!avatar.startsWith('http')) return './assets/img/default-user.svg';
    return avatar;
  }

  onDisplayModal() {
    this.displayModal = true;
  }

  onCloseModal(event: Event) {
    this.isDeleteError = false;
    event.stopPropagation();
    this.displayModal = false;
  }
}
