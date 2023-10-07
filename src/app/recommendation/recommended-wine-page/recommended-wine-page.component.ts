import {Component, OnInit} from '@angular/core';
import {Wine} from "../../Models/wine.model";
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import {map} from "rxjs/operators";
import {Subscription} from "rxjs";

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
      .select('recommendationPage')
      .pipe(map((recommendationPageState) => recommendationPageState.recommendedWines))
      .subscribe((wines: Wine[]) => {
        this.recommendedWines = wines;
        console.log(this)
      })
  }
}
