import { Component, OnInit, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.scss']
})
export class TermsConditionComponent implements OnInit {

  constructor(
    @Optional() private matDialogRef: MatDialogRef<TermsConditionComponent>
  ) { }

  ngOnInit(): void { }

  onDecline() {
    this.matDialogRef.close({ accepted: false });
  }

  onAccept() {
    this.matDialogRef.close({ accepted: true });
  }
}
