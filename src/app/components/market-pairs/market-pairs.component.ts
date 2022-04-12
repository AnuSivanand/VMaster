import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { KiteTicker } from 'kiteconnect-ts';
import { TickFull } from 'kiteconnect-ts/dist/types/ticker';
import { Constants } from '../../shared/common/constant';
import { BuySellTradeComponent } from '../buy-sell-trade/buy-sell-trade.component';


@Component({
  selector: 'app-market-pairs',
  templateUrl: './market-pairs.component.html',
  styleUrls: ['./market-pairs.component.scss']
})
export class MarketPairsComponent implements OnInit {

  public tickerValues: any;
  public dialogConfig: MatDialogConfig;
  public favouriteFutureStocks: any;

  constructor(
    private dialog: MatDialog,
  ) {
    this.dialogConfig = new MatDialogConfig();
    this.favouriteFutureStocks = [
      { "id": 408065, "stockName": "INFY" },
      { "id": 884737, "stockName": "TATA Motors" },
      { "id": 2953217, "stockName": "TCS" },
      { "id": 341249, "stockName": "HDFCBANK" }
    ];
  }

  ngOnInit(): void {
    let exchangeIds = this.favouriteFutureStocks.map((item: any) => item.id);
    if (exchangeIds) {
      this.getTickerValues(exchangeIds);
    }
  }

  getTickerValues(items: any) {
    let ticker = new KiteTicker({
      apiKey: Constants.API_KEY,
      accessToken: Constants.ACCESS_TOKEN
    });
    ticker.on('ticks', (ticks: TickFull) => {
      this.tickerValues = ticks;
      console.log('tickerValues ---> ', this.tickerValues);

      this.favouriteFutureStocks = this.favouriteFutureStocks.map((item: any) => {
        let currentItem = this.tickerValues.find((newItem: any) => {
          return item.id === newItem.instrumentToken
        });
        if (currentItem) {
          return {
            id: item.id,
            stockName: item.stockName,
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


      console.log(this.favouriteFutureStocks)
    });

    ticker.on('connect', () => {
      ticker.subscribe(items);
      ticker.setMode(ticker.modeFull, items);
    });
    ticker.connect();
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

  // stockName(type: any) {
  //   if (type == '341249') { return 'HDFCBANK'; }
  //   else if (type == '2953217') { return 'TCS'; }
  //   else if (type == '884737') { return 'TATA Motors'; }
  //   else if (type == '408065') { return 'INFY'; }
  //   else { return "No Name"; }
  // }

}
