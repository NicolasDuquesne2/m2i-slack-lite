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
  // text: String = '';
  userId: number = 0;

  editing = false;
  editForm: PostForm = { id: null, text: '', user: null, channel: null };

  constructor(private httpPostService: HttpPostService) { }

   formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('fr-FR', options);
  }

  startEdit() {
    this.editing = true;
    this.editForm.id = this.post.id;
    this.editForm.text = this.post.text;

  }
  closeEdit() {
    this.editing = false;
    this.editForm = { id: null, text: '', user: null, channel: null };
  }

  submitEditForm() {
    this.httpPostService.partialUpdatePost(this.editForm).subscribe(updatedPost => {
      // this.editForm = updatedPost;
      
    });
  }

  deletePost(){
  
  }

}
