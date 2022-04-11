import { Component, OnInit, AfterViewInit } from '@angular/core';
declare const TradingView: any;
@Component({
  selector: 'app-trading-dark-chart',
  templateUrl: './trading-dark-chart.component.html',
  styleUrls: ['./trading-dark-chart.component.scss'],
})
export class TradingDarkChartComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    new TradingView.widget({
      width: '100%',
      height: '550px',
      symbol: 'BINANCE:BTCUSDT',
      theme: 'dark',
      allow_symbol_change: true,
      container_id: 'tradingview_3463e',
    });
  }
}
