import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      let numid: number = 0;

      if (id) numid = parseInt(id);

      this.httppostService.getPostByChannelId(numid).subscribe({
        next: (res) => {
          console.log(res);
          this.posts = res;
          if (res.length > 0) this.channel = res[0].channel;
        },
        error: (err) => {
          console.error('something wrong occurred: ' + err.message);
          this.router.navigate(['/error']);
        },
      });
    });
  }
}
