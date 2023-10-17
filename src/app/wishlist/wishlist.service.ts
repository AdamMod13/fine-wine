import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import {Wine} from "../Models/wine.model";
import {WishlistReq} from "../Models/WishlistReq.model";
import {User} from "../auth/user.model";
import * as WishlistActions from "../wishlist/store/wishlist.action";

@Injectable({providedIn: 'root'})
export class WishlistService {
  private favoriteWines: Wine[]; // Define the variable for favorite wines.
  private user: User;

  constructor(
    private store: Store<fromApp.AppState>
  ) {
    this.store.select(state => state.auth.user).subscribe(user => {
      if (user) {
        this.user = user;
        this.store.dispatch(new WishlistActions.FetchAllFavourites(this.user.id))
      }
    });
    this.store.select(state => state.wishlistPage.allFavourites).subscribe(wines => {
      this.favoriteWines = [...wines];
    });
  }

  addToFavourites(wine: Wine) {
    if (this.user) {
      const saveWineReq: WishlistReq = {
        userId: this.user.id,
        wine: wine
      }
      this.store.dispatch(new WishlistActions.AddWineToFavourites(saveWineReq));
    }
  }

  deleteFromFavourites(wine: Wine) {
    if (this.user) {
      const saveWineReq: WishlistReq = {
        userId: this.user.id,
        wine: wine
      }
      this.store.dispatch(new WishlistActions.DeleteWineFromFavourites(saveWineReq));
    }
  }

  checkIfLiked(wineId: number) {
    return this.favoriteWines.some(savedWine => savedWine.id === wineId);
  }
}
