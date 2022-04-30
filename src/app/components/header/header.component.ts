import { Component, OnInit } from '@angular/core';
import { DarkModeService } from 'angular-dark-mode';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  darkMode$ = this.darkModeService.darkMode$;

  public userDetails: any;

  constructor(
    private darkModeService: DarkModeService,
    private authService: AuthenticationService
  ) { }
  
  ngOnInit(): void {
    this.userDetails = JSON.parse(sessionStorage.getItem("current_user") || "");
    if (!this.userDetails) {
      this.authService.logout();
    }
  }

  onToggle(): void {
    this.darkModeService.toggle();
  }

  onLogout() {
    this.authService.logout().subscribe((resp) => {
      this.authService.finishLogout();
    }); 
  }
}
