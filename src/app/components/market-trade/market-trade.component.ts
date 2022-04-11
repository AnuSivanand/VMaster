import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BuySellTradeComponent } from "../buy-sell-trade/buy-sell-trade.component";

@Component({
  selector: 'app-market-trade',
  templateUrl: './market-trade.component.html',
  styleUrls: ['./market-trade.component.scss']
})
export class MarketTradeComponent implements OnInit {

  public message: string;
  public disableDelete: boolean;
  public title: string;
  public hideActions = false;
  public size: string;
  public paletteColour: string;
  public displayToggle: boolean;
  public showMoreBtn: boolean = false;
  public showTextView: boolean = false;
  public shortMessage: string = 'abc';
  public longMessage: string = 'xyz';
  public truncateLength: number;
  public truncateConfig = { small: 80, medium: 250, large: 420 };

  constructor(
    private dialogRef: MatDialogRef<BuySellTradeComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.message = data.message;
    this.disableDelete = data.disableDelete;
    this.title = data.title;
    this.hideActions = data.hideActions;
    this.size = data.size;
    this.truncateLength = 10;
    this.paletteColour = this.title && this.title.includes("Delete") ? "warn" : "primary";
    this.displayToggle = data.displayToggle;
  }

  ngOnInit(): void {
  }

  confirmClick() {
    this.dialogRef.close(true);
  }

  cancelClick() {
    this.dialogRef.close(false);
  }

}
