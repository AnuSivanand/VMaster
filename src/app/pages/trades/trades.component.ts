import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmPopupComponent } from 'src/app/components/confirm-popup/confirm-popup.component';
import { ApiService } from 'src/app/shared/services/api/api.service';

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.scss']
})
export class TradesComponent implements OnInit {

  public tradeStatus: string = 'pending';
  public tradeList!: any[];
  public dialogConfig: MatDialogConfig;

  constructor(
    private matDialogRef: MatDialog,
    private apiService: ApiService,
    private toastrService: ToastrService
  ) {
    this.dialogConfig = new MatDialogConfig();
    this.getTrades(this.tradeStatus);
  }

  ngOnInit(): void {  }

  getTrades(tradeStatus: string) {
    this.tradeStatus = tradeStatus;
    this.apiService.getTrades(tradeStatus).subscribe((resp) => {
      if (resp && resp.status) {
        this.tradeList = resp.orders;
      }
    });
  }

  onCancelClick(trade: any) {
    this.dialogConfig.data = {
      trade: trade
    };
    const dialogRef = this.matDialogRef.open(ConfirmPopupComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.status == 'cancelled') {
        this.getTrades(this.tradeStatus);
      }
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
