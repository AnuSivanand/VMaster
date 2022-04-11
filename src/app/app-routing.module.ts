import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeComponent } from './pages/exchange/exchange.component';
import { LockComponent } from './pages/lock/lock.component';
import { LoginComponent } from './pages/login/login.component';
import { MarketsComponent } from './pages/markets/markets.component';
import { NewsDetailsComponent } from './pages/news-details/news-details.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { OtpNumberComponent } from './pages/otp-number/otp-number.component';
import { OtpVerifyComponent } from './pages/otp-verify/otp-verify.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ResetComponent } from './pages/reset/reset.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { WalletComponent } from './pages/wallet/wallet.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: "full"},
  { path: 'login', component: LoginComponent },
  { path: 'exchange', component: ExchangeComponent },
  { path: 'lock', component: LockComponent },
  { path: 'markets', component: MarketsComponent },
  { path: 'news-details', component: NewsDetailsComponent },
  { path: 'otp-number', component: OtpNumberComponent },
  { path: 'otp-verify', component: OtpVerifyComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'reset', component: ResetComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
  { path: 'wallet', component: WalletComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
