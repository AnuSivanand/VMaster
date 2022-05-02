import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/api/api.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  public fundDetails: any;

  constructor(
    private apiService: ApiService,
    private toastrService: ToastrService
  ) {
    this.getFundsDetails();
  }

  ngOnInit(): void {
  }

  getFundsDetails() {
    this.apiService.getFunds().subscribe((resp) => {
      if (resp && resp.status) {
        this.fundDetails = resp.funds;
      }
    });
  }

}
