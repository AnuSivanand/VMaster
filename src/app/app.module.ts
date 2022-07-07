import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { LoaderInterceptor } from './shared/interceptors/loader/loader.interceptor';
import { StockDeleteConfirmComponent } from './components/stock-delete-confirm/stock-delete-confirm.component';
import { CookieService } from 'ngx-cookie-service';
import { EncryptDecryptService } from './shared/services/encrypt-decrypt/encrypt-decrypt.service';
import { ConfirmPopupComponent } from './components/confirm-popup/confirm-popup.component';

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
    StockDeleteConfirmComponent,
    ConfirmPopupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatIconModule,
    MatDialogModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
    PagesWrapperModule,
    IvyCarouselModule
  ],
  providers: [
    EncryptDecryptService,
    CookieService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: LoaderInterceptor,
    //   multi: true,
    // },
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
