import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/api/api.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  public portfolio: any;
  public orderList: any;
  public lot_size: any;
  public exchnage_type: any;

  constructor(
    private apiService: ApiService,
    private toastrService: ToastrService
  ) { 
    this.getPortfolioDetails();
  }

  ngOnInit(): void {
  }

  getPortfolioDetails() {
    this.apiService.getPortfolio().subscribe((resp) => {
      if (resp && resp.status) {
        this.portfolio = resp.portfolio;
        this.orderList = resp.orders;
        this.lot_size = resp.lot_size;
        this.exchnage_type = resp.exchnage_type;
      }
    });
  }
}
