import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Channel } from 'src/app/interface/channel';
import { Post } from 'src/app/interface/post';
import { HttpChannelService } from 'src/app/service/http-channel.service';
import { HttpPostService } from 'src/app/service/http-post.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
})
export class ChannelComponent implements OnInit {
  posts: Post[] = [];
  channel!: Channel;
  isLoading: boolean = false;
  isLogged!:boolean;
  userId!:number|null;

  constructor(

    private httppostService: HttpPostService,
    private httpChannelService: HttpChannelService,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {

    this.userService.isLogged.subscribe((observer) => {
      this.isLogged = observer;
    });

    this.userService.userId.subscribe((observer) => {
      this.userId = observer;
    });

  }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      let numid: number = 0;

      if (id) numid = parseInt(id);


      this.httpChannelService.getChanelById(numid).subscribe({
        next: (res) => {
          this.channel = res;
          console.log(res);
          
        },
        error: (err) => {
          console.error('something wrong occurred: ' + err.message);
          this.router.navigate(['/error']);
        },
      })

      this.httppostService.getPostByChannelId(numid).subscribe({
        next: (res) => {
          this.posts = res;
        },
        error: (err) => {
          console.error('something wrong occurred: ' + err.message);
          this.router.navigate(['/error']);
        },
      });
    });

  }
}