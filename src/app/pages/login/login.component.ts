import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public errorMessage: String = "";

  constructor(
    private router: Router,
    private loginFormBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.loginForm = this.loginFormBuilder.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void { }

  onSignInClick() {
    this.errorMessage = '';
    let loginCredentials = this.loginForm.getRawValue();
    if (loginCredentials.email && loginCredentials.password) {
      this.authService.login(loginCredentials)
        .subscribe(this.onLoginSuccess.bind(this),
          this.onLoginFailure.bind(this));
    }
  }

  onLoginSuccess(resp: any) {
    console.log('resp ---> ', resp);
    if (resp && resp.success) {
      this.router.navigate(["/vmaster/watchlist"]);
    }
  }

  onLoginFailure(error: any) {
    console.log('error ---> ', error, error.error, error.error.message);
    if (error && error.error && error.error.message) {
      this.errorMessage = error.error.message;
    } else {
      this.errorMessage = 'Invalid login';
    }
  }

}
