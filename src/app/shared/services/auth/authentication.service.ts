import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Constants } from '../../common/constant';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = Constants.BASE_URL;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  login(user: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + "login", user);
  }

  loginSuccess(loginResp: any) {
    localStorage.setItem("access_token", loginResp.token);
    sessionStorage.setItem("current_user", JSON.stringify(loginResp.user));
  }
  
  logout(): Observable<any> {
    return this.httpClient.post(this.baseUrl + "logout", {});
  }

  finishLogout() {
    localStorage.removeItem("access_token");
    sessionStorage.removeItem("current_user");
    this.router.navigateByUrl("/login");
  }

}
