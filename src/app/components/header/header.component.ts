import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  public userDetails: any;

  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem("current_user") || "");
    if (!this.userDetails) {
      this.authService.logout();
    }
  }

  onLogout() {
    this.authService.logout().subscribe((resp) => {
      this.authService.finishLogout();
    });
  }
}
