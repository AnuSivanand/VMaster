import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
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
    let loginCredentials = this.loginForm.getRawValue();
    if (loginCredentials.email && loginCredentials.password) {
      this.authService.login(loginCredentials)
        .subscribe(this.onLoginSuccess.bind(this),
          this.onLoginFailure.bind(this));
    }
  }

  onLoginSuccess(resp: any) {
    console.log(resp);
  }

  onLoginFailure(error: any) {
    console.log(error);
  }

}
