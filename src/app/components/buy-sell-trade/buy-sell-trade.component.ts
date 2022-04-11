import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-buy-sell-trade',
  templateUrl: './buy-sell-trade.component.html',
  styleUrls: ['./buy-sell-trade.component.scss']
})
export class BuySellTradeComponent implements OnInit {

  public data: any;
  public message: string;
  public disableDelete: boolean;
  public title: string;
  public hideActions = false;
  public size: string;
  public paletteColour: string;
  public displayToggle: boolean;
  public showMoreBtn: boolean = false;
  public showTextView: boolean = false;
  public shortMessage: string = 'short msg';
  public longMessage: string = 'login msg';
  public truncateLength: number;
  public truncateConfig = { small: 80, medium: 250, large: 420 };

  constructor(
    private dialogRef: MatDialogRef<BuySellTradeComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.data = data;
    this.message = data.message;
    this.disableDelete = data.disableDelete;
    this.title = data.title;
    this.hideActions = data.hideActions;
    this.size = data.size;
    this.truncateLength = data.truncateLength || 10;
    this.paletteColour = this.title && this.title.includes("Delete") ? "warn" : "primary";
    this.displayToggle = data.displayToggle;
  }

  ngOnInit(): void {
    
  }

  contentViewInit() {
    this.longMessage = this.message;
    if (this.longMessage && this.longMessage.length > this.truncateLength) {
      this.showTextView = true;
      this.showMoreBtn = true;
      this.shortMessage = 'short msg2'
    } else {
      this.showTextView = false;
    }
  }

  confirmClick() {
    this.dialogRef.close(true);
  }

  cancelClick() {
    this.dialogRef.close(false);
  }



}
