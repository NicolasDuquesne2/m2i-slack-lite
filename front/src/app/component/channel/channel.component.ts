import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpPostService } from 'src/app/service/http-post.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
})
export class ChannelComponent {
  posts = ['Ornstein', 'Artorias', 'Malenia'];
  accessToForm: boolean = true;
  isLoading: boolean = false;

  constructor(
    private ar: ActivatedRoute,
    private httpPostService: HttpPostService
  ) {
    let id = this.ar.snapshot.params['id'];
    console.log(id);
  }
}
