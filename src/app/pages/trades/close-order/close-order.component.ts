import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KiteTicker } from 'kiteconnect-ts';
import { TickFull } from 'kiteconnect-ts/dist/types/ticker';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/shared/common/constant';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-close-order',
  templateUrl: './close-order.component.html',
  styleUrls: ['./close-order.component.scss']
})
export class CloseOrderComponent implements OnInit {

  public trade: any;
  public type: string;
  public itemTicker: any;
  public interval: any;

  constructor(
    private dialogRef: MatDialogRef<CloseOrderComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private apiService: ApiService,
    private toastrService: ToastrService
  ) {
    this.trade = data.trade;
    this.type = data.type;

    this.getTickerValues([this.trade.instrument_id]);
    this.interval = interval(5000).subscribe(() => {
      this.getTickerValues([this.trade.instrument_id]);
    })
  }

  ngOnInit(): void { }

  ngOnDestroy() {
    // Will clear when component is destroyed e.g. route is navigated away from.
    this.interval.unsubscribe();
  }

  close() {
    this.dialogRef.close(true);
  }

  cancelClick() {
    this.dialogRef.close(false);
  }

  tradeActionsClick(event: any) {
    event.target.hidden = true;
    if (this.type === 'cancel') {
      this.tradeCancel();
    } else if (this.type === 'close') {
      this.tradeClose();
    }
  }

  tradeCancel() {
    this.apiService.onTradeCancel(this.trade.id).subscribe((resp) => {
      if (resp && resp.status) {
        this.toastrService.success(resp.message)
      } else {
        this.toastrService.error(resp.message)
      }
      let audio = new Audio();
      audio.src = "assets/Notification.mp3";
      audio.load();
      audio.play();
      this.dialogRef.close({ 'status': 'cancelled' });
    }, (error) => {
      this.toastrService.error('Error on cancelling order.')
      this.cancelClick();
    });
  }

  tradeClose() {
    this.apiService.onTradeClose(this.trade.id).subscribe((resp) => {
      if (resp && resp.status) {
        this.toastrService.success(resp.message)
      } else {
        this.toastrService.error(resp.message)
      }
      let audio = new Audio();
      audio.src = "assets/Notification.mp3";
      audio.load();
      audio.play();
      this.dialogRef.close({ 'status': 'closed' });
    }, (error) => {
      this.toastrService.error('Error on closing order.')
      this.cancelClick();
    });
  }

  getTickerValues(selectedTickerId: any) {

    this.apiService.getFavuoriteStocksSingle(selectedTickerId).subscribe((resp) => {
      var item = resp.favourites[0];
      item.instrument_details = JSON.parse(item.instrument_details);
      this.itemTicker = {
        id: item.instrument_details.instrument_token,
        instrument_token: item.instrument_details.instrument_token,
        averagePrice: item.instrument_details.average_traded_price,
        buyQuantity: item.instrument_details.total_buy_quantity,
        depth: item.instrument_details.depth,
        instrumentToken: item.instrument_details.instrument_token,
        lastPrice: item.instrument_details.last_price,
        lastQuantity: item.instrument_details.last_traded_quantity,
        lastTradeTime: item.instrument_details.last_trade_time,
        mode: item.instrument_details.mode,
        ohlc: item.instrument_details.ohlc,
        oi: item.instrument_details.oi,
        oiDayHigh: item.instrument_details.oi_day_high,
        oiDayLow: item.instrument_details.oi_day_low,
        sellQuantity: item.instrument_details.total_sell_quantity,
        timestamp: item.instrument_details.exchange_timestamp,
        tradable: item.instrument_details.last_traded_quantity,
        volume: item.instrument_details.volume_traded,
        change: ((item.instrument_details.last_price - item.instrument_details.ohlc.close) * 100 / item.instrument_details.ohlc.close).toFixed(2)
      };
    });
    /*let ticker = new KiteTicker({
      apiKey: Constants.API_KEY,
      accessToken: localStorage.getItem('ticker_access_token') || ""
    });
    ticker.on('ticks', (ticksItem: TickFull) => {
      let currentTicksItem: any = ticksItem;
      currentTicksItem = (currentTicksItem && currentTicksItem[0]) ? currentTicksItem[0] : null;
      this.itemTicker = {
        id: currentTicksItem.instrumentToken,
        instrument_token: currentTicksItem.instrumentToken,
        averagePrice: currentTicksItem?.averagePrice || 0,
        buyQuantity: currentTicksItem?.buyQuantity || 0,
        depth: currentTicksItem?.depth || {},
        instrumentToken: currentTicksItem?.instrumentToken || 0,
        lastPrice: currentTicksItem?.lastPrice || 0,
        lastQuantity: currentTicksItem?.lastQuantity || 0,
        lastTradeTime: currentTicksItem?.lastTradeTime || {},
        mode: currentTicksItem?.mode || 0,
        ohlc: currentTicksItem?.ohlc || {},
        oi: currentTicksItem?.oi || 0,
        oiDayHigh: currentTicksItem?.oiDayHigh || {},
        oiDayLow: currentTicksItem?.oiDayLow || 0,
        sellQuantity: currentTicksItem?.sellQuantity || 0,
        timestamp: currentTicksItem?.timestamp || 0,
        tradable: currentTicksItem?.tradable || {},
        volume: currentTicksItem?.volume || 0,
        change: ((currentTicksItem.lastPrice - currentTicksItem.ohlc.close) * 100 / currentTicksItem.ohlc.close).toFixed(2)
      };
      return this.itemTicker;
    });
    ticker.on('connect', () => {
      ticker.subscribe(selectedTickerId);
      ticker.setMode(ticker.modeFull, selectedTickerId);
    });
    ticker.connect();*/
  }
}
