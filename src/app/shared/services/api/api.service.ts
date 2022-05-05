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
  
  doBuyOrSell(item: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + "buy_sell", item);
  }

  deleteStock(instrumentToken: any, type: string) {
    return this.httpClient.delete(this.baseUrl + "remove_favourites?instrument_token=" + instrumentToken + "&type=" + type);
  }

  getTrades(tradeStatus: any): Observable<any> {
    return this.httpClient.get(this.baseUrl + "trades?type=" + tradeStatus);
  }

  getPortfolio(): Observable<any> {
    return this.httpClient.get(this.baseUrl + "portfolio");
  }

  getFunds(): Observable<any> {
    return this.httpClient.get(this.baseUrl + "funds");
  }

  getProfile(): Observable<any> {
    return this.httpClient.get(this.baseUrl + "profile");
  }

  changePassword(passObj: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + "change_password", passObj);
  }
}
