import { Injectable } from '@angular/core';
import { catchError } from "rxjs/operators";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private toastrService: ToastrService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((response) => {
        if (response instanceof HttpErrorResponse) {
          switch (response.status) {
            case 500:
              this.toastrService.error("Internal server error");
              break;
            case 501:
              this.toastrService.error("Bad gateway.");
              break;
            case 502:
              this.toastrService.error("Error Processing Request");
              break;
            case 503:
              this.toastrService.error("Service Unavailable");
              break;
            case 408:
              this.toastrService.error("Request timed out, please try again");
              break;
            case 401:
              this.toastrService.error(response.error.message ? response.error.message : "Unauthorised access");
              if (response.error) {                
                  // Logout                
              }
              break;
            default:
              break;
          }
        }
        return Observable.throw(response);
      })
    );
  }
}
