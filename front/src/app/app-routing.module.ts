import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { ErrorPageComponent } from './component/error-page/error-page.component';
import { UserAccountComponent } from './component/user-account/user-account.component';
import { ChannelComponent } from './component/channel/channel.component';
import { AuthGuardOK } from './guard/authok';
import { AuthGuardBad } from './guard/authbad';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'channels/1',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuardOK]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [AuthGuardOK]
  },
  {
    path: 'channels/:id',
    component: ChannelComponent,
  },
  {
    path: 'account',
    component: UserAccountComponent,
    canActivate: [AuthGuardBad]
  },
  {
    path: '**',
    pathMatch: 'full',
    component: ErrorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
