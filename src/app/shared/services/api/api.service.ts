import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../../common/constant';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = Constants.BASE_URL;

  constructor(
    private httpClient: HttpClient
  ) { }

  getFavuoriteStocks(exchangeType: String): Observable<any> {
    return this.httpClient.get(this.baseUrl + "get_favourites_list?type=" + exchangeType);
  }

  getWatchlistStocks(exchangeType: String): Observable<any> {
    return this.httpClient.get(this.baseUrl + "get_instruments_list?type=" + exchangeType);
  }

  addFavouriteStocks(favList: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + "save_favourites", favList);
  }
}
