import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { KiteTicker } from "kiteconnect-ts";
import { TickFull } from "kiteconnect-ts/dist/types/ticker";
import { ToastrService } from "ngx-toastr";
import { Constants } from "src/app/shared/common/constant";
import { ApiService } from "src/app/shared/services/api/api.service";
import { interval } from 'rxjs';

@Component({
  selector: 'app-buy-sell-trade',
  templateUrl: './buy-sell-trade.component.html',
  styleUrls: ['./buy-sell-trade.component.scss']
})
export class BuySellTradeComponent implements OnInit {

  public data: any;
  public equityType: string = 'market';
  public tradeForm!: FormGroup;
  public itemTicker: any;
  private equity: any = 'market';
  public interval: any;

  constructor(
    private dialogRef: MatDialogRef<BuySellTradeComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private fb: FormBuilder,
    private apiService: ApiService,
    private toastrService: ToastrService
  ) {
    this.getTickerValues([data.ticker.instrument_token]);
    this.interval = interval(5000).subscribe(() => {
      this.getTickerValues([data.ticker.instrument_token]);
    })
    this.data = data;
    if (this.equityType === 'market') {
      this.createTradeMarketForm();
    } else if (this.equityType === 'order') {
      this.createTradeOrderForm();
    }
  }

  ngOnInit(): void {

  }

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

  onValChange(val: string) {
    if (val === 'market') {
      this.equity = 'market';
      this.createTradeMarketForm();
    } else if (val === 'order') {
      this.equity = 'order';
      this.createTradeOrderForm();
    }
  }

  createTradeMarketForm() {
    this.clearTradeForm();
    this.tradeForm = this.fb.group({
      quantity: new FormControl(1, [Validators.required])
    });
  }

  createTradeOrderForm() {
    this.clearTradeForm();
    this.tradeForm = this.fb.group({
      quantity: new FormControl(1, [Validators.required]),
      lastPrice: new FormControl('', [Validators.required])
      // this.data.ticker.lastPrice
    });
  }

  clearTradeForm() {
    if (this.tradeForm && this.tradeForm.controls) {
      if (this.tradeForm.controls.quantity)
        this.tradeForm.removeControl('quantity');
      if (this.tradeForm.controls.lastPrice)
        this.tradeForm.removeControl('lastPrice');
    }
  }

  tradeAction(event: any) {
    event.target.hidden = true;
    let formValues = this.getTradeValues();
    let item = {
      "instrument_token": this.data.ticker.instrumentToken,
      "quantity": formValues.quantity,
      "amount": this.equity == 'market' ? this.data.ticker.lastPrice : formValues.lastPrice,
      "type": this.equity == 'market' ? 1 : 2,
      "instrument_details": JSON.stringify(this.data.ticker),
      "action": this.data.type == 'buy' ? 1 : 2
    };
    this.apiService.doBuyOrSell(item).subscribe((resp) => {
      if (resp.status) {
        this.toastrService.success(resp.message);
      } else {
        this.toastrService.error(resp.message);
      }
      let audio = new Audio();
      audio.src = "assets/Notification.mp3";
      audio.load();
      audio.play();
      this.close();
    }, (error) => {
      this.close();
    });
  }

  getTradeValues() {
    return this.tradeForm.getRawValue();
  }

  getTickerValues(selectedTickerId: any) {

    this.apiService.getFavuoriteStocksSingle(selectedTickerId).subscribe((resp) => {
      var item = resp.favourites[0];
      item.instrument_details = JSON.parse(item.instrument_details);
      this.itemTicker = {
        id: this.data.ticker.instrument_token,
        instrument_token: this.data.ticker.instrument_token,
        stockName: this.data.ticker.trading_symbol,
        trading_symbol: this.data.ticker.trading_symbol,
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
        id: this.data.ticker.instrument_token,
        instrument_token: this.data.ticker.instrument_token,
        stockName: this.data.ticker.trading_symbol,
        trading_symbol: this.data.ticker.trading_symbol,
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
    });
    ticker.on('connect', () => {
      ticker.subscribe(selectedTickerId);
      ticker.setMode(ticker.modeFull, selectedTickerId);
    });
    ticker.connect();
  }*/
}
}
