import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // public redirectUrl: string;
  private baseUrl = "/";

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) { }

  login(user: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + "loginUser", user);
  }

  redirect(loginResponse: any) {
    if (loginResponse) {
      return this.router.navigate(["/vmaster/watchlist"]);
    } else {
      return this.router.navigate(["/not-found"]);
    }
  }

}
