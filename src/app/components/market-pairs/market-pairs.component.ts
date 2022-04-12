import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
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

  public exchangeIds: any;
  public tickerValues: any;
  public dialogConfig: MatDialogConfig;
  public favouriteFutureStocks:any;

  constructor(    
    private dialog: MatDialog,
  ) { 
    this.dialogConfig = new MatDialogConfig();
    this.favouriteFutureStocks = [{"id":408065,"stockName":"INFY"}, {"id":884737,"stockName":"TATA Motors"}, {"id":2953217,"stockName":"TCS"}, {"id":341249,"stockName":"HDFCBANK"}];
  }

  ngOnInit(): void {
    // this.exchangeIds = [738561];
    this.exchangeIds = [408065, 884737, 2953217, 341249];
    this.getTickerValues(this.exchangeIds);
  }

  getTickerValues(items: any) {
    let ticker = new KiteTicker({
      apiKey: Constants.API_KEY,
      accessToken: Constants.ACCESS_TOKEN
    });
    ticker.on('ticks', (ticks: TickFull) => {
      this.tickerValues = ticks;
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
	
  stockName(type: any){
	if(type == '341249') { return 'HDFCBANK'; }
	else if(type == '2953217') { return 'TCS'; }
	else if(type == '884737') { return 'TATA Motors'; }
	else if(type == '408065') { return 'INFY'; }
	else { return "No Name"; }
  }

}
