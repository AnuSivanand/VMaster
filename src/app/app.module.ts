import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HistoryOrderComponent } from './components/history-order/history-order.component';
import { MarketCarouselComponent } from './components/market-carousel/market-carousel.component';
import { MarketHistoryComponent } from './components/market-history/market-history.component';
import { MarketNewsComponent } from './components/market-news/market-news.component';
import { MarketPairsComponent } from './components/market-pairs/market-pairs.component';
import { MarketsListComponent } from './components/markets-list/markets-list.component';
import { MarketTradeComponent } from './components/market-trade/market-trade.component';
import { OrderBookComponent } from './components/order-book/order-book.component';
import { TradingChartComponent } from './components/trading-chart/trading-chart.component';
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
import { TradingDarkChartComponent } from './components/trading-dark-chart/trading-dark-chart.component';
import { BuySellTradeComponent } from './components/buy-sell-trade/buy-sell-trade.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HistoryOrderComponent,
    MarketCarouselComponent,
    MarketHistoryComponent,
    MarketNewsComponent,
    MarketPairsComponent,
    MarketsListComponent,
    MarketTradeComponent,
    OrderBookComponent,
    TradingChartComponent,
    ExchangeComponent,
    LockComponent,
    LoginComponent,
    MarketsComponent,
    NewsDetailsComponent,
    NotFoundComponent,
    OtpNumberComponent,
    OtpVerifyComponent,
    ProfileComponent,
    ResetComponent,
    SettingsComponent,
    SignUpComponent,
    TermsAndConditionsComponent,
    WalletComponent,
    TradingDarkChartComponent,
    BuySellTradeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IvyCarouselModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
