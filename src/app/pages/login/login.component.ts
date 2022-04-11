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
    private authService:AuthenticationService
  ) {
    this.loginForm = this.loginFormBuilder.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
   }

   ngOnInit(): void { }

   onSignInClick() {
    let loginCredentials = this.loginForm.getRawValue();
    console.log(loginCredentials)
    if (loginCredentials.email && loginCredentials.password) {
      this.gotoExchange(loginCredentials);
    }
  }

  gotoExchange(loginCredentials: any) {
    this.authService.redirect(loginCredentials);
  }

}
