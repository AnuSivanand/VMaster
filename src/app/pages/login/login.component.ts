import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { EncryptDecryptService } from 'src/app/shared/services/encrypt-decrypt/encrypt-decrypt.service';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public errorMessage: String = "";
  public userDetails: any;

  constructor(
    private router: Router,
    private loginFormBuilder: FormBuilder,
    private authService: AuthenticationService,
    private toastrService: ToastrService,
    private cookieService: CookieService,
    private encryptDecryptService: EncryptDecryptService,
    private matDialogRef: MatDialog,
  ) {
    this.loginForm = this.loginFormBuilder.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      rememberMe: new FormControl(false)
    });
  }

  ngOnInit(): void {
    if (this.checkUserIsLoggedIn()) {
      this.router.navigate(["/watchlist"]);
    } else {
      let loggedUserDetails = this.cookieService.get('user_details') || '{}';
      let decryptUserDetails = this.encryptDecryptService.get('user_details', loggedUserDetails);
      this.userDetails = decryptUserDetails ? JSON.parse(decryptUserDetails) : {};
      if (this.userDetails && this.userDetails.rememberMe) {
        this.loginForm.patchValue({
          email: this.userDetails.email,
          password: this.userDetails.password,
          rememberMe: this.userDetails.rememberMe
        });
      }
    }
  }

  checkUserIsLoggedIn() {
    const token = localStorage.getItem("access_token"),
      tickerToken = localStorage.getItem("ticker_access_token"),
      userEmail = localStorage.getItem("current_user_email");
    if (token && tickerToken && userEmail) {
      return true;
    } else {
      return false;
    }
  }

  onSignInClick() {
    this.errorMessage = '';
    const loginCredentials = this.loginForm.getRawValue();
    if (loginCredentials.email && loginCredentials.password) {
      this.authService.login(loginCredentials)
        .subscribe(this.onLoginSuccess.bind(this));
    }
  }

  onLoginSuccess(resp: any) {
    if (resp && resp.success) {
      let termsAccepted = this.cookieService.get('terms_accepted');
      if (termsAccepted && termsAccepted == 'true') {
        this.doProceedLogin(resp);
      } else {
        const dialogRef = this.matDialogRef.open(TermsConditionComponent);
        dialogRef.afterClosed().subscribe((result: any) => {
          if (result.accepted) {
            this.doProceedLogin(resp);
          }
        });
      }
    } else {
      this.toastrService.error(resp.message);
    }
  }

  doProceedLogin(resp: any) {
    const loginCredentials = this.loginForm.getRawValue();
    let date = new Date(),
      midnight = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
    this.cookieService.set("terms_accepted", 'true', { expires: midnight });

    if (loginCredentials.rememberMe) {
      let encryptUserDetails = this.encryptDecryptService.set('user_details', JSON.stringify(loginCredentials));
      this.cookieService.set('user_details', encryptUserDetails, 30);
    } else {
      this.cookieService.delete('user_details');
    }
    this.authService.loginSuccess(resp);
    this.router.navigate(["/watchlist"]);
  }

}
