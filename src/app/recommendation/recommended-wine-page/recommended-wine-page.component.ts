import {Component, OnDestroy, OnInit} from '@angular/core';
import {Wine} from "../../Models/wine.model";
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import {map} from "rxjs/operators";
import {Subscription} from "rxjs";
import {User} from "../../auth/user.model";
import * as WishlistActions from "../../wishlist/store/wishlist.action";
import * as RecommendationPageActions from "../store/recommendation.action";
import {SpinnerService} from "../../Shared/spinner/spinner.service";
import {WishlistService} from "../../wishlist/wishlist.service";

@Component({
  selector: 'app-recommended-wine-page',
  templateUrl: './recommended-wine-page.component.html',
  styleUrls: ['./recommended-wine-page.component.css']
})
export class RecommendedWinePageComponent implements OnInit, OnDestroy {
  public recommendedWines: Wine[] = [];
  private subscription: Subscription;
  private authSubscription: Subscription;
  public user: User;

  constructor(private store: Store<fromApp.AppState>, private spinnerService: SpinnerService, public wishlistService: WishlistService) {
  }

  ngOnInit() {
    this.spinnerService.setLoading(true);
    this.store.dispatch(new RecommendationPageActions.GetCurrentRecommendations());
    this.subscription = this.store
      .select('recommendation')
      .pipe(map((recommendationPageState) => recommendationPageState.recommendedWines))
      .subscribe((wines: Wine[]) => {
        if (wines) {
          this.spinnerService.setLoading(false);
        }
        this.recommendedWines = wines;
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
    this.subscription.unsubscribe()
  }
}
