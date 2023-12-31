import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './component/home/home.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { ChannelCreateFormComponent } from './component/channel-create-form/channel-create-form.component';
import { ChannelListComponent } from './component/channel-list/channel-list.component';
import { SignupComponent } from './component/signup/signup.component';
import { LoginComponent } from './component/login/login.component';
import { UserAccountComponent } from './component/user-account/user-account.component';
import { ErrorPageComponent } from './component/error-page/error-page.component';
import { ChannelComponent } from './component/channel/channel.component';
import { PostFormComponent } from './component/post-form/post-form.component';
import { PostCardComponent } from './component/post-card/post-card.component';
import { ChannelUpdateFormComponent } from './component/channel-update-form/channel-update-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserAccountEmailComponent } from './component/user-account-email/user-account-email.component';
import { UserAccountPasswordComponent } from './component/user-account-password/user-account-password.component';
import { UserAccountNameComponent } from './component/user-account-name/user-account-name.component';
import { UserAccountAvatarComponent } from './component/user-account-avatar/user-account-avatar.component';
import { UserAccountDeleteComponent } from './component/user-account-delete/user-account-delete.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    UserProfileComponent,
    ChannelCreateFormComponent,
    ChannelListComponent,
    SignupComponent,
    LoginComponent,
    UserAccountComponent,
    ErrorPageComponent,
    ChannelComponent,
    PostFormComponent,
    PostCardComponent,
    ChannelUpdateFormComponent,
    UserAccountEmailComponent,
    UserAccountPasswordComponent,
    UserAccountNameComponent,
    UserAccountAvatarComponent,
    UserAccountDeleteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [HomeComponent],
})
export class AppModule {}
