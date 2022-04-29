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
  ) { }

  login(user: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + "login", user);
  }

}
