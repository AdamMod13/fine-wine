import {Component, OnDestroy, OnInit} from '@angular/core';
import * as fromApp from '../store/app.reducer';
import {Store} from '@ngrx/store';
import {Wine} from "../Models/wine.model";
import {Subscription} from "rxjs";
import {map} from "rxjs/operators";
import * as MainPageActions from "./store/main-page.action";
import {SpinnerService} from "../Shared/spinner/spinner.service";
import {User} from "../auth/user.model";
import * as WishlistActions from "../wishlist/store/wishlist.action";
import {WishlistService} from "../wishlist/wishlist.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, OnDestroy {
  public bestRandomWines: Wine[] = [];
  private mainPageSubscription: Subscription;
  private authSubscription: Subscription;
  public user: User;

  constructor(
    private store: Store<fromApp.AppState>,
    private spinnerService: SpinnerService,
    public wishlistService: WishlistService
  ) {
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
        }
      })
  }

  ngOnDestroy() {
    this.store.dispatch(new WishlistActions.ClearFavourites());
    this.authSubscription.unsubscribe();
    this.mainPageSubscription.unsubscribe();
  }
}
