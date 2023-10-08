import {Component, OnDestroy, OnInit} from '@angular/core';
import * as fromApp from '../store/app.reducer';
import {Store} from '@ngrx/store';
import {Wine} from "../Models/wine.model";
import {Subscription} from "rxjs";
import {map} from "rxjs/operators";
import * as MainPageActions from "./store/main-page.action";
import {SpinnerService} from "../spinner/spinner.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, OnDestroy {
  public bestRandomWines: Wine[] = [];
  private subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>, private spinnerService: SpinnerService) {
  }

  ngOnInit() {
    this.spinnerService.setLoading(true);
    this.store.dispatch(new MainPageActions.FetchBestRandomWines());
    this.subscription = this.store
      .select('mainPage')
      .pipe(map((mainPageState) => mainPageState.bestRandomWines))
      .subscribe((wines: Wine[]) => {
        this.bestRandomWines = wines;
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
