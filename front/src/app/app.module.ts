import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './component/home/home.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { ChannelCreateFormComponent } from './component/channel-create-form/channel-create-form.component';
import { ChannelListComponent } from './component/channel-list/channel-list.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    UserProfileComponent,
    ChannelCreateFormComponent,
    ChannelListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class AppModule { }
