import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'watchlistFilter'
})
export class WatchlistFilterPipe implements PipeTransform {

  transform(watchlist: any[], searchId: any) {
    if (searchId) {
      return watchlist.filter(
        (item) => item.id === searchId
      );
    }
    return watchlist;
  }

}
