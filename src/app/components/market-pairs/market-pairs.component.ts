import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { KiteTicker } from 'kiteconnect-ts';
import { TickFull } from 'kiteconnect-ts/dist/types/ticker';
import { Constants } from '../../shared/common/constant';
import { BuySellTradeComponent } from '../buy-sell-trade/buy-sell-trade.component';
import { ApiService } from 'src/app/shared/services/api/api.service';


@Component({
  selector: 'app-market-pairs',
  templateUrl: './market-pairs.component.html',
  styleUrls: ['./market-pairs.component.scss']
})
export class MarketPairsComponent implements OnInit {

  public tickerValues: any;
  public dialogConfig: MatDialogConfig;
  public favouriteFutureStocks: any = [];
  public futureStockList: any = [];

  public selectedStocks = [];
  public dropdownSettings: IDropdownSettings = {};
  public loading: boolean = false;
  public exchangeType: String = 'NFO';

  constructor(
    private dialog: MatDialog,
    private apiService: ApiService
  ) {
    this.dialogConfig = new MatDialogConfig();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'instrument_token',
      textField: 'trading_symbol',
      enableCheckAll: false,
      allowSearchFilter: true
    };
  }

  ngOnInit(): void {
    this.getWatchlist();
    this.getFavouriteFutureList();
  }

  getWatchlist() {
    this.loading = true;
    this.apiService.getWatchlistStocks(this.exchangeType)
      .subscribe(this.onGetWatchlistSuccess.bind(this));
  }

  onGetWatchlistSuccess(resp: any) {
    console.log(resp);
    if (resp && resp.status) {
      this.futureStockList = resp.instruments;
      this.loading = false;
    }
  }

  getFavouriteFutureList() {
    this.loading = true;
    this.apiService.getFavuoriteStocks(this.exchangeType)
      .subscribe(this.onGetFavouriteFutureListSuccess.bind(this));

  }

  onGetFavouriteFutureListSuccess(resp: any) {
    console.log(resp);
    if (resp && resp.status) {
      this.favouriteFutureStocks = resp.favourites;
      this.loading = false;
      this.getStockListValues();
    }
  }

  getStockListValues() {
    let exchangeIds = this.favouriteFutureStocks.map((item: any) => item.instrument_token);
    if (exchangeIds) {
      this.getTickerValues(exchangeIds);
    }
  }

  getTickerValues(items: any) {
    this.loading = true;
    let ticker = new KiteTicker({
      apiKey: Constants.API_KEY,
      accessToken: Constants.ACCESS_TOKEN
    });
    ticker.on('ticks', (ticks: TickFull) => {
      this.tickerValues = ticks;
      this.favouriteFutureStocks = this.favouriteFutureStocks.map((item: any) => {
        let currentItem = this.tickerValues.find((newItem: any) => {
          return item.instrument_token === newItem.instrumentToken;
        });
        if (currentItem) {
          return {
            id: item.instrument_token,
            stockName: item.trading_symbol,
            averagePrice: (currentItem && currentItem.averagePrice) ? currentItem.averagePrice : 0,
            buyQuantity: (currentItem && currentItem.buyQuantity) ? currentItem.buyQuantity : 0,
            depth: (currentItem && currentItem.depth) ? currentItem.depth : {},
            instrumentToken: (currentItem && currentItem.instrumentToken) ? currentItem.instrumentToken : 0,
            lastPrice: (currentItem && currentItem.lastPrice) ? currentItem.lastPrice : 0,
            lastQuantity: (currentItem && currentItem.lastQuantity) ? currentItem.lastQuantity : 0,
            lastTradeTime: (currentItem && currentItem.lastTradeTime) ? currentItem.lastTradeTime : {},
            mode: (currentItem && currentItem.mode) ? currentItem.mode : 0,
            ohlc: (currentItem && currentItem.ohlc) ? currentItem.ohlc : {},
            oi: (currentItem && currentItem.oi) ? currentItem.oi : 0,
            oiDayHigh: (currentItem && currentItem.oiDayHigh) ? currentItem.oiDayHigh : {},
            oiDayLow: (currentItem && currentItem.oiDayLow) ? currentItem.oiDayLow : 0,
            sellQuantity: (currentItem && currentItem.sellQuantity) ? currentItem.sellQuantity : 0,
            timestamp: (currentItem && currentItem.timestamp) ? currentItem.timestamp : 0,
            tradable: (currentItem && currentItem.tradable) ? currentItem.tradable : {},
            volume: (currentItem && currentItem.volume) ? currentItem.volume : 0,
            change: ((currentItem.lastPrice - currentItem.ohlc.close) * 100 / currentItem.ohlc.close).toFixed(2)
          }
        } else {
          return item;
        }
      });
    });
    ticker.on('connect', () => {
      ticker.subscribe(items);
      ticker.setMode(ticker.modeFull, items);
    });
    ticker.connect();
    this.loading = false;
  }

  onNavSelect(exchgType: String) {
    this.exchangeType = exchgType;
    setTimeout(() => {
      this.ngOnInit();
    }, 500);
  }

  openDialog(type: string, ticker: any) {
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.data = {
      type: type,
      id: 123,
      message: 'test message goes here',
      title: type,
      size: "small",
      ticker: ticker
    };
    const dialogRef = this.dialog.open(BuySellTradeComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe((data) => { });
  }

  onDeleteStockItem(ticker: any) {
    console.log(ticker)
  }

  onDropDownClose() {
    let favList = {
      "instruments": this.selectedStocks.map((item: any) => item.instrument_token),
      "type": this.exchangeType
    };
    if (this.selectedStocks && this.selectedStocks.length) {
      this.loading = true;
      this.apiService.addFavouriteStocks(favList).subscribe((resp) => {
        this.favouriteFutureStocks = resp.favourites;
        this.futureStockList = resp.instruments;
        this.selectedStocks = [];
        setTimeout(() => {
          this.loading = false;
          this.ngOnInit();
        }, 500);
      });
    }
  }

  onItemDeSelect(item: any) {
    console.log(item);
  }
}
