import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { Constants } from '../../common/constant';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = Constants.BASE_URL;
  private logged = new ReplaySubject<boolean>(1);
  isLogged = this.logged.asObservable();
  private user: any;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private cookieService: CookieService,
  ) { }

  login(user: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + "login", user);
  }

  loginSuccess(loginResp: any) {
    localStorage.setItem("access_token", loginResp.token);
    localStorage.setItem("ticker_access_token", loginResp.tickerToken)
    localStorage.setItem("current_user_email", loginResp.user?.email);
    localStorage.setItem("current_user", JSON.stringify(loginResp.user));
    this.user = loginResp.user;
    this.logged.next(this.user);
  }

  logout(): Observable<any> {
    return this.httpClient.get(this.baseUrl + "logout");
  }

  finishLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("ticker_access_token");
    localStorage.removeItem("current_user_email");
    localStorage.removeItem("current_user");
    this.router.navigateByUrl("/login");
  }

}
