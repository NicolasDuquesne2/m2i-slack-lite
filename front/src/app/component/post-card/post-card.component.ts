import { Component, Input } from '@angular/core';
import { Post } from 'src/app/interface/post';
import { PostForm } from 'src/app/interface/post-form';
import { HttpPostService } from 'src/app/service/http-post.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent {
  @Input() post!: Post;

  userId: number = 0;

  isEditing: boolean = false;
  editForm: PostForm = { id: null, text: '', user: null, channel: null };

  constructor(private httpPostService: HttpPostService) { }

  formatedDate(): string {
    let dateFormated = this.post.createdDateTime === this.post.updatedDateTime ? 'Publié le ' : 'Modifié le ';
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    dateFormated += new Date(this.post.updatedDateTime).toLocaleDateString('fr-FR', options);
    return dateFormated;
  }

  startEdit() {
    this.isEditing = true;
    this.editForm.id = this.post.id;
    this.editForm.text = this.post.text;

  }
  closeEdit() {
    this.isEditing = false;
    this.editForm = { id: null, text: '', user: null, channel: null };
  }

  submitEditForm() {
    this.httpPostService.partialUpdatePost(this.editForm).subscribe(updatedPost => {
      // this.editForm = updatedPost;
      
    });
  }

  deletePost(){
  
  }
  limitText(event: any, maxLength: number) {
    if (event.target.value.length > maxLength) {
      event.target.value = event.target.value.slice(0, maxLength);
    }
  }
}
