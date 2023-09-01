import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChannelForm } from 'src/app/interface/channel-form';
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
  isError = false;
  isErrorName = false;
  isErrorColor = false; 
  userId!:number; 


  constructor(
    private formBuilder: FormBuilder,
    private httpChannelService: HttpChannelService,
    private userService: UserService,
    private router: Router
  ) {
    this.createChannelForm = this.formBuilder.group({
      channelName: ['', [Validators.required, Validators.min(5), Validators.max(20)]],
      channelColor: ['', [Validators.required]],
    });

    this.userService.userId.subscribe((observer) => {if(observer) this.userId = observer})
  }

  onAddChannel() {
    this.isError = false;
    this.isErrorName = false;
    this.isErrorColor = false;

    // Form validation
    if (this.createChannelForm.get('channelName')?.invalid) this.isErrorName = true;
    if (this.createChannelForm.get('channelColor')?.invalid) this.isErrorColor = true;
    if (this.createChannelForm.invalid) return;


    // Creation of the user variable
    const channelForm: ChannelForm = {
      id: null,
      name: this.createChannelForm.value.channelName,
      color:this.createChannelForm.value.channelColor,
      deletable:true,
      user: {id: this.userId}
    };

    console.log(channelForm);
    
    // Appel API
    this.httpChannelService.createChannel(channelForm).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['channels/1']);
      },
      error: (err) => {
        //console.error(err.error.error);
        this.isError = true;
      },
    });

  }
}
