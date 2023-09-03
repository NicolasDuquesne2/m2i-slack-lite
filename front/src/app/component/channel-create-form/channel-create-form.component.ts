import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Channel } from 'src/app/interface/channel';
import { ChannelForm } from 'src/app/interface/channel-form';
import { ChannelService } from 'src/app/service/channel.service';
import { HttpChannelService } from 'src/app/service/http-channel.service';
import { HttpUserService } from 'src/app/service/http-user.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: '[app-channel-create-form]',
  templateUrl: './channel-create-form.component.html',
  styleUrls: ['./channel-create-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChannelCreateFormComponent {
  createChannelForm: FormGroup;
  isCreateError = false;
  isErrorName = false;
  isErrorColor = false;
  userId!: number;
  newChannelId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private httpChannelService: HttpChannelService,
    private userService: UserService,
    private channelService: ChannelService,
    private router: Router
  ) {
    this.createChannelForm = this.formBuilder.group({
      channelName: [
        '',
        [Validators.required, Validators.min(5), Validators.max(20)],
      ],
      channelColor: ['', [Validators.required]],
    });

    this.userService.userId.subscribe((observer) => {
      if (observer) this.userId = observer;
    });
  }

  onAddChannel() {
    this.isCreateError = false;
    this.isErrorName = false;
    this.isErrorColor = false;

    if (this.createChannelForm.get('channelName')?.invalid)
      this.isErrorName = true;
    if (this.createChannelForm.get('channelColor')?.invalid)
      this.isErrorColor = true;
    if (this.createChannelForm.invalid) return;

    const channelForm: ChannelForm = {
      id: null,
      name: this.createChannelForm.value.channelName,
      color: this.createChannelForm.value.channelColor,
      deletable: true,
      user: { id: this.userId },
    };

    this.httpChannelService.createChannel(channelForm).subscribe({
      next: (data) => {
        this.httpChannelService.getChannels().subscribe({
          next: (data) => {
            const lastChannel = data.pop();
            if (lastChannel) {
              this.newChannelId = lastChannel.id;
              this.channelService.addElemeToChannels(lastChannel);
            }
            this.router.navigate([`/channels/${this.newChannelId}`]);
          },
          error: (err) => {
            this.isCreateError = true;
            setTimeout(() => {
              this.isCreateError = false;
            }, 2000);
          },
        });
      },
      error: (err) => {
        this.isCreateError = true;
        setTimeout(() => {
          this.isCreateError = false;
        }, 2000);
      },
    });
  }
}
