import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // public redirectUrl: string;
  private baseUrl = "/";

  constructor(
    private router: Router,
  ) { }

  redirect(loginResponse: any) {
    // ToDo: clean this up, also it's possible a user won't have access to synthesizer so validate path first.
    if (loginResponse) {
      return this.router.navigate(["/vmaster/watchlist"]);
    } else {
      return this.router.navigate(["/not-found"]);
    }
  }

}
