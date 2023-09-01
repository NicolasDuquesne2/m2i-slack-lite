import { Component } from '@angular/core';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent {
  isLogged: boolean = false;
  newPostText: string = '';

  limitText(event: any) {
    const maxLength = 1000;
    if (event.target.value.length > maxLength) {
      event.target.value = event.target.value.slice(0, maxLength);
    }
  }

  submitPost(){
    this.newPostText = '';
  }
}
