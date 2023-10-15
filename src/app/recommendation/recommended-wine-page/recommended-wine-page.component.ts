import {Component, OnInit} from '@angular/core';
import {Wine} from "../../Models/wine.model";
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import {map} from "rxjs/operators";
import {Subscription} from "rxjs";
import {User} from "../../auth/user.model";
import * as WishlistActions from "../../wishlist/store/wishlist.action";

@Component({
  selector: 'app-recommended-wine-page',
  templateUrl: './recommended-wine-page.component.html',
  styleUrls: ['./recommended-wine-page.component.css']
})
export class RecommendedWinePageComponent implements OnInit {
  public recommendedWines: Wine[] = [];
  private subscription: Subscription;
  private authSubscription: Subscription;
  public user: User;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.subscription = this.store
      .select('recommendation')
      .pipe(map((recommendationPageState) => recommendationPageState.recommendedWines))
      .subscribe((wines: Wine[]) => {
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

  addToFavourites(wine: Wine) {
    this.store.dispatch(new WishlistActions.AddWineToFavourites({userId: this.user.id, wine: wine}));
  }
}
