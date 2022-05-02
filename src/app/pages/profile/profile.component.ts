import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/api/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public nseTrading: any;
  public mcxTrading: any;

  constructor(
    private apiService: ApiService,
    private toastrService: ToastrService
  ) {
    this.getProfileDetails();
  }

  ngOnInit(): void { }

  getProfileDetails() {
    this.apiService.getProfile().subscribe((resp) => {
      if (resp && resp.status) {
        this.nseTrading = resp.nseTrading;
        this.mcxTrading = resp.mcxTrading;
      }
    });
  }

}
