import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/api/api.service';

@Component({
  selector: 'app-stock-delete-confirm',
  templateUrl: './stock-delete-confirm.component.html',
  styleUrls: ['./stock-delete-confirm.component.scss']
})
export class StockDeleteConfirmComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<StockDeleteConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  close() {
    this.dialogRef.close(true);
  }

  cancelClick() {
    this.dialogRef.close(false);
  }

  deleteClick() {    
    this.apiService.deleteStock(this.data.ticker.instrumentToken, this.data.type).subscribe((resp: any) => {
      if (resp && resp.status) {
        this.dialogRef.close({
          deleteStatus: true,
          favouriteList: resp.favourites,
          // exchangeType: this.data.type
        });
      }
      console.log(this.data, resp)
    }, (error) => {

    });
  }

}
