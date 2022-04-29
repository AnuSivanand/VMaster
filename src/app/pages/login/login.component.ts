import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private authService: AuthenticationService,
    private toastrService: ToastrService
  ) {
    this.loginForm = this.loginFormBuilder.group({
      email: new FormControl('manoj0070@gmail.com', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void { }

  onSignInClick() {
    this.errorMessage = '';
    let loginCredentials = this.loginForm.getRawValue();
    if (loginCredentials.email && loginCredentials.password) {
      this.authService.login(loginCredentials)
        .subscribe(this.onLoginSuccess.bind(this));
    }
  }

  onLoginSuccess(resp: any) {
    if (resp && resp.success) {
      this.authService.loginSuccess(resp);
      this.router.navigate(["/vmaster/watchlist"]);
    } else {
      this.toastrService.error(resp.message);
    }
  }

}
