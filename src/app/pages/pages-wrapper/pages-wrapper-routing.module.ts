import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeComponent } from '../exchange/exchange.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { ProfileComponent } from '../profile/profile.component';
import { SettingsComponent } from '../settings/settings.component';
import { TradesComponent } from '../trades/trades.component';
import { WalletComponent } from '../wallet/wallet.component';
import { PagesWrapperComponent } from './pages-wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: PagesWrapperComponent,
    children: [
      { path: 'watchlist', component: ExchangeComponent },
      { path: 'trades', component: TradesComponent },
      { path: 'portfolio', component: PortfolioComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'fund', component: WalletComponent },
      {path: 'settings', component:SettingsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesWrapperRoutingModule { }
