import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import {Subscription} from "rxjs";
import * as WishlistActions from "./store/wishlist.action";
import {map} from "rxjs/operators";
import {Wine} from "../Models/wine.model";
import {User} from "../auth/user.model";
import {WishlistService} from "./wishlist.service";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit, OnDestroy {
  public pageNumber: number = 0;
  public favouritesWines: Wine[] = [];
  public user: User;

  private authSubscription: Subscription;
  private wishlistSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>, public wishlistService: WishlistService) {
  }

  ngOnInit() {
    this.authSubscription = this.store
      .select('auth')
      .pipe(map(auth => auth))
      .subscribe((auth) => {
        if (auth.user) {
          this.user = auth.user;
          this.store.dispatch(new WishlistActions.FetchFavouritePage({
            pageNumber: this.pageNumber,
            userId: auth.user.id
          }));
          this.pageNumber += 1;
        }
      });
    this.wishlistSubscription = this.store
      .select('wishlistPage')
      .pipe(map(wishlist => wishlist))
      .subscribe((wishlist) => {
        this.favouritesWines = [...wishlist.favouriteWinePage];
      });
  }

  loadMore() {
    this.store.dispatch(new WishlistActions.FetchFavouritePage({pageNumber: this.pageNumber, userId: this.user.id}));
    this.pageNumber += 1;
  }

  ngOnDestroy() {
    this.store.dispatch(new WishlistActions.ClearFavourites());
    this.authSubscription.unsubscribe();
    this.wishlistSubscription.unsubscribe()
  }
}
