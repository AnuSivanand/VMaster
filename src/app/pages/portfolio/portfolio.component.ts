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
      }
    });
  }
}
