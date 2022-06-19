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
    // this.apiService.onTradeCancel(tradeStatus).subscribe((resp) => {
    //   if (resp && resp.status) {
    //     this.toastrService.success('my success msg')
    //   } else {
    //     this.toastrService.error('my error msg')
    //   }
    // }, (error) => {
    //   this.toastrService.error('my error msg')
    // });
  }

  onCloseClick(trade: any) {
    
  }
}
