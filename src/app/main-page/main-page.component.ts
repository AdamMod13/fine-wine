import {Component, OnDestroy, OnInit} from '@angular/core';
import * as fromApp from '../store/app.reducer';
import {Store} from '@ngrx/store';
import {Wine} from "../Models/wine.model";
import {Subscription} from "rxjs";
import {map} from "rxjs/operators";
import * as MainPageActions from "./store/main-page.action";
import {SpinnerService} from "../spinner/spinner.service";
import {User} from "../auth/user.model";
import * as WishlistActions from "../wishlist/store/wishlist.action";
import {WishlistReq} from "../Models/WishlistReq.model";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, OnDestroy {
  public bestRandomWines: Wine[] = [];
  public favouriteWinesIds: number[] = [];
  private mainPageSubscription: Subscription;
  private authSubscription: Subscription;
  private favouritesSubscription: Subscription;
  public user: User;

  constructor(private store: Store<fromApp.AppState>, private spinnerService: SpinnerService) {
  }

  ngOnInit() {
    this.spinnerService.setLoading(true);
    this.store.dispatch(new MainPageActions.FetchBestRandomWines());
    this.mainPageSubscription = this.store
      .select('mainPage')
      .pipe(map((mainPageState) => mainPageState.bestRandomWines))
      .subscribe((wines: Wine[]) => {
        this.bestRandomWines = wines;
      })
    this.authSubscription = this.store
      .select('auth')
      .pipe(map((auth) => auth))
      .subscribe((auth) => {
        if (auth.user) {
          this.user = auth.user;
          this.store.dispatch(new WishlistActions.FetchAllFavourites(this.user.id))
        }
      })
    this.favouritesSubscription = this.store
      .select('wishlistPage')
      .pipe(map((favourites) => favourites))
      .subscribe((favouriteWines) => {
        console.log(favouriteWines)
        this.favouriteWinesIds = favouriteWines?.favouriteWine.map(wine => wine.id);
      })
  }

  addToFavourites(wine: Wine) {
    if (this.user) {
      console.log(wine)
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
    return this.favouriteWinesIds.some(savedWineId => savedWineId === wineId);
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    this.mainPageSubscription.unsubscribe();
  }
}
