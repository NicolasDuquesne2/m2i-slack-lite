import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Channel } from 'src/app/interface/channel';
import { ChannelForm } from 'src/app/interface/channel-form';
import { ChannelService } from 'src/app/service/channel.service';
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
  displayModal: boolean = false;
  updateChannelForm: FormGroup;
  userId!: number;
  isUpdateError = false;
  isDeleteError = false;
  isErrorName = false;
  isErrorColor = false;

  constructor(
    private formBuilder: FormBuilder,
    private httpChannelService: HttpChannelService,
    private channelService: ChannelService,
    private userService: UserService,
    private router: Router
  ) {
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
    this.displayForm = true;
    this.isUpdateError = false;
    if (this.displayForm) {
      this.updateChannelForm.controls['channelName'].setValue(
        this.channel.name
      );
      this.updateChannelForm.controls['channelColor'].setValue(
        this.channel.color
      );
    }
  }

  onCloseForm() {
    this.displayForm = false;
  }

  onDisplayModal() {
    this.displayModal = true;
    this.isDeleteError = false;
  }

  onCloseModal(event: Event) {
    event.stopPropagation();
    this.displayModal = false;
  }

  onUpdateChannel(event: Event) {
    event.preventDefault();

      this.isUpdateError = false;
    this.isErrorName = false;
    this.isErrorColor = false;

    
    if (this.updateChannelForm.get('channelName')?.invalid)
      this.isErrorName = true;
    if (this.updateChannelForm.get('channelColor')?.invalid)
      this.isErrorColor = true;
    if (this.updateChannelForm.invalid) return;

    
    const channelForm: ChannelForm = {
      id: this.channel.id,
      name: this.updateChannelForm.value.channelName,
      color: this.updateChannelForm.value.channelColor,
      deletable: this.channel.deletable,
      user: { id: this.userId },
    };

    this.httpChannelService.partialUpdateChannel(channelForm).subscribe({
      next: (data) => {
        this.httpChannelService.getChanelById(this.channel.id).subscribe({
          next: (data) => {
            this.channelService.setChannel(data);
            this.httpChannelService.getChannels().subscribe({
              next: (data) => {
                this.channelService.setChannels(data);
                this.displayForm = false;
              },
              error: (err) => {
                this.isUpdateError = true
              }
            });
          },
          error: (err) => {
            this.isUpdateError = true;
          }
        });
      },
      error: (err) => {
        this.isUpdateError = true;
      },
    });
  }

  onDelete(event: Event) {
    event.stopPropagation();
    this.httpChannelService.deleteChannelById(this.channel.id).subscribe({
      next: (data) => {
        this.httpChannelService.getChannels().subscribe({
          next: (data) => {
            this.channelService.setChannels(data);
            this.onCloseModal(event);
            this.router.navigate(['']);
          },
          error: (err) => {
            this.isDeleteError = true;
          },
        });
      },
      error: (err) => {
        this.isDeleteError = true;
      },
    });
  }
}
