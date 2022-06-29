import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/api/api.service';

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.scss']
})
export class TradesComponent implements OnInit {

  public tradeStatus: string = 'pending';
  public tradeList!: any[];

  constructor(
    private apiService: ApiService,
    private toastrService: ToastrService
  ) {
    this.getTrades(this.tradeStatus);
  }

  ngOnInit(): void {
  }

  getTrades(tradeStatus: string) {
    this.tradeStatus = tradeStatus;
    this.apiService.getTrades(tradeStatus).subscribe((resp) => {
      if (resp && resp.status) {
        this.tradeList = resp.orders;
      }
    });
  }

  onCancelClick(trade: any) {
     this.apiService.onTradeCancel(trade.id).subscribe((resp) => {
       if (resp && resp.status) {
         this.toastrService.success(resp.message)
       } else {
         this.toastrService.error(resp.message)
       }
        let audio = new Audio();
        audio.src = "assets/Notification.mp3";
        audio.load();
        audio.play();
       this.getTrades(this.tradeStatus);
     }, (error) => {
       this.toastrService.error('my error msg')
     });
  }

  onCloseClick(trade: any) {
    this.apiService.onTradeClose(trade.id).subscribe((resp) => {
       if (resp && resp.status) {
         this.toastrService.success(resp.message)
       } else {
         this.toastrService.error(resp.message)
       }
       this.getTrades(this.tradeStatus);
     }, (error) => {
       this.toastrService.error('my error msg')
     });
  }
}
