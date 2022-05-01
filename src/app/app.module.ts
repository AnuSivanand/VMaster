import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonToggleModule} from '@angular/material/button-toggle'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarketPairsComponent } from './components/market-pairs/market-pairs.component';
import { ExchangeComponent } from './pages/exchange/exchange.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { WalletComponent } from './pages/wallet/wallet.component';
import { BuySellTradeComponent } from './components/buy-sell-trade/buy-sell-trade.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PagesWrapperModule } from './pages/pages-wrapper/pages-wrapper.module';
import { TradesComponent } from './pages/trades/trades.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { WatchlistFilterPipe } from './pages/exchange/filters/watchlist-filter.pipe';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { HttpErrorInterceptor } from './shared/interceptors/http-error.interceptor';

// import { TradingDarkChartComponent } from './components/trading-dark-chart/trading-dark-chart.component';
// import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
// import { SignUpComponent } from './pages/sign-up/sign-up.component';
// import { HistoryOrderComponent } from './components/history-order/history-order.component';
// import { MarketCarouselComponent } from './components/market-carousel/market-carousel.component';
// import { MarketHistoryComponent } from './components/market-history/market-history.component';
// import { MarketNewsComponent } from './components/market-news/market-news.component';
// import { MarketsComponent } from './pages/markets/markets.component';
// import { MarketsListComponent } from './components/markets-list/markets-list.component';
// import { MarketTradeComponent } from './components/market-trade/market-trade.component';
// import { OrderBookComponent } from './components/order-book/order-book.component';
// import { TradingChartComponent } from './components/trading-chart/trading-chart.component';
// import { LockComponent } from './pages/lock/lock.component';
// import { NewsDetailsComponent } from './pages/news-details/news-details.component';
// import { OtpNumberComponent } from './pages/otp-number/otp-number.component';
// import { OtpVerifyComponent } from './pages/otp-verify/otp-verify.component';
// import { ResetComponent } from './pages/reset/reset.component';

@NgModule({
  declarations: [
    AppComponent,
    MarketPairsComponent,   
    ExchangeComponent,
    LoginComponent,
    NotFoundComponent,
    ProfileComponent,
    SettingsComponent,
    WalletComponent,
    BuySellTradeComponent,
    TradesComponent,
    PortfolioComponent,
    WatchlistFilterPipe,

    // SignUpComponent,
    // TermsAndConditionsComponent,
    // TradingDarkChartComponent,
    // HistoryOrderComponent,
    // MarketCarouselComponent,
    // MarketHistoryComponent,
    // MarketNewsComponent,
    // MarketsComponent,
    // MarketsListComponent,
    // MarketTradeComponent,
    // OrderBookComponent,
    // TradingChartComponent,
    // LockComponent,
    // NewsDetailsComponent,
    // OtpNumberComponent,
    // OtpVerifyComponent,
    // ResetComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
    PagesWrapperModule,
    IvyCarouselModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
