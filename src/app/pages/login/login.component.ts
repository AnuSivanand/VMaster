import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { EncryptDecryptService } from 'src/app/shared/services/encrypt-decrypt/encrypt-decrypt.service';

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
    private encryptDecryptService: EncryptDecryptService
  ) {
    this.loginForm = this.loginFormBuilder.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      rememberMe: new FormControl(false)
    });
  }

  ngOnInit(): void {
    let loggedUserDetails = this.cookieService.get('user_details') || '{}';
    let decryptUserDetails = this.encryptDecryptService.get('userDetails', loggedUserDetails);
    this.userDetails = JSON.parse(decryptUserDetails);    
    if (this.userDetails && this.userDetails.rememberMe) {
      this.loginForm.patchValue({
        email: this.userDetails.userMail,
        password: this.userDetails.password,
        rememberMe: this.userDetails.rememberMe
      });
    }
  }

  onSignInClick() {
    this.errorMessage = '';
    let loginCredentials = this.loginForm.getRawValue();
    console.log(loginCredentials)
    if (loginCredentials.rememberMe) {
      let loggedUser = {
        userMail: loginCredentials.email,
        password: loginCredentials.password,
        rememberMe: loginCredentials.rememberMe
      };
      let encryptUserDetails = this.encryptDecryptService.set('userDetails', JSON.stringify(loggedUser));
      this.cookieService.set('user_details', encryptUserDetails, 20);
    } else {
      this.cookieService.delete('user_details');
    }
    if (loginCredentials.email && loginCredentials.password) {
      this.authService.login(loginCredentials)
        .subscribe(this.onLoginSuccess.bind(this));
    }
  }

  onLoginSuccess(resp: any) {
    if (resp && resp.success) {
      this.authService.loginSuccess(resp);
      this.router.navigate(["/watchlist"]);
    } else {
      this.toastrService.error(resp.message);
    }
  }

}
