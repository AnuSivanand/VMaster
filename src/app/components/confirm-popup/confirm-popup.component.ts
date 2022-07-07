import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/api/api.service';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss']
})
export class ConfirmPopupComponent implements OnInit {

  public trade: any;
  public type: string;

  constructor(
    private dialogRef: MatDialogRef<ConfirmPopupComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private apiService: ApiService,
    private toastrService: ToastrService
  ) {
    this.trade = data.trade;
    this.type = data.type;
  }

  ngOnInit(): void { }

  close() {
    this.dialogRef.close(true);
  }

  cancelClick() {
    this.dialogRef.close(false);
  }

  tradeActionsClick() {
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

}
