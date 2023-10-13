import {Component, OnInit} from '@angular/core';
import {Wine} from "../../Models/wine.model";
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import {map} from "rxjs/operators";
import {Subscription} from "rxjs";
import * as MainPageActions from '../../main-page/store/main-page.action';

@Component({
  selector: 'app-recommended-wine-page',
  templateUrl: './recommended-wine-page.component.html',
  styleUrls: ['./recommended-wine-page.component.css']
})
export class RecommendedWinePageComponent implements OnInit {
  public recommendedWines: Wine[] = [];
  private subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.subscription = this.store
      .select('recommendation')
      .pipe(map((recommendationPageState) => recommendationPageState.recommendedWines))
      .subscribe((wines: Wine[]) => {
        this.recommendedWines = wines;
      })
  }

  addToFavourites(wine: Wine) {
    this.store.dispatch(new MainPageActions.AddWineToFavourites(wine));
  }
}
