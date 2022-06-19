import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/shared/services/api/api.service";

@Component({
  selector: 'app-buy-sell-trade',
  templateUrl: './buy-sell-trade.component.html',
  styleUrls: ['./buy-sell-trade.component.scss']
})
export class BuySellTradeComponent implements OnInit {

  public data: any;
  public equityType: string = 'market';
  public tradeForm!: FormGroup;
  private equity: any = 'market';

  constructor(
    private dialogRef: MatDialogRef<BuySellTradeComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private fb: FormBuilder,
    private apiService: ApiService,
    private toastrService: ToastrService
  ) {
    this.data = data;    
    if (this.equityType === 'market') {
      this.createTradeMarketForm();
    } else if (this.equityType === 'order') {
      this.createTradeOrderForm();
    }
  }

  ngOnInit(): void {

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

  tradeAction() {
    let formValues = this.getTradeValues();
    let item = {
      "instrument_token": this.data.ticker.instrumentToken,
      "quantity": formValues.quantity,
      "amount": this.equity == 'market' ? this.data.ticker.lastPrice : formValues.lastPrice,
      "type": this.equity == 'market' ? 1 : 2,
      "instrument_details": JSON.stringify(this.data.ticker),
      "action": this.data.type == 'buy' ? 1: 2
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
    }); 
  }

  getTradeValues() {
    return this.tradeForm.getRawValue();
  }
}
