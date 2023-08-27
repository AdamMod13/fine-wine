import {Component, OnDestroy, OnInit} from '@angular/core';
import * as fromApp from '../store/app.reducer';
import {Store} from '@ngrx/store';
import {Wine} from "../Models/wine.model";
import {Subscription} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, OnDestroy {
  public bestRandomWines: Wine[] = [];
  private subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
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
