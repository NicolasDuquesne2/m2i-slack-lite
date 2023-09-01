import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Channel } from 'src/app/interface/channel';
import { Post } from 'src/app/interface/post';
import { HttpPostService } from 'src/app/service/http-post.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
})
export class ChannelComponent implements OnInit {
  posts: Post[] = [];
  channel!: Channel;
  accessToForm: boolean = true;
  isLoading: boolean = false;

  constructor(
    private httppostService: HttpPostService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id = this.activeRoute.snapshot.params['id'];
    console.log(id);
    this.httppostService.getPostByChannelId(id).subscribe({
      next: (res) => {
        console.log(res);
        this.posts = res;
        if (res.length > 0) this.channel = res[0].channel;
      },
      error: (err) => {
        console.error('something wrong occurred: ' + err.message);
      },
    });
  }
}
