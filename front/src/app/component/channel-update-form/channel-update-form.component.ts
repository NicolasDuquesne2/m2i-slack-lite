import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Channel } from 'src/app/interface/channel';
import { HttpChannelService } from 'src/app/service/http-channel.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-channel-update-form',
  templateUrl: './channel-update-form.component.html',
  styleUrls: ['./channel-update-form.component.scss'],
})
export class ChannelUpdateFormComponent {
  @Input()
  channel!: Channel;
  displayForm: boolean = false;
  updateChannelForm: FormGroup;
  userId!: number;

  constructor(private formBuilder: FormBuilder, private httpChannelService: HttpChannelService, private userService: UserService,) {
    this.updateChannelForm = this.formBuilder.group({
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


  onDisplayForm() {
    this.displayForm = !this.displayForm;
  }

  onUpdateChannel(event:Event) {

  }
}
