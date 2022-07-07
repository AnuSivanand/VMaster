import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { interval } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  
  public isLoading = new Subject<boolean>();

  constructor(private apiService: ApiService) {

    interval(3000).subscribe(() => {
    
      this.apiService.buyOrder().subscribe((resp) => {
      });

      this.apiService.sellOrder().subscribe((resp) => {
      });
    })

   }

  show() {
    this.isLoading.next(true);
  }

  hide() {
    this.isLoading.next(false);
  }
}
