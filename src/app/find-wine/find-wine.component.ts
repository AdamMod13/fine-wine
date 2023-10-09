import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as FindWineActions from './store/find-wine.action'
import {map} from "rxjs/operators";
import {SpinnerService} from "../spinner/spinner.service";
import {Subscription} from "rxjs";
import {WinePageRes} from "../Models/winePageRes.model";
import {Wine} from "../Models/wine.model";

@Component({
  selector: 'app-find-wine',
  templateUrl: './find-wine.component.html',
  styleUrls: ['./find-wine.component.css']
})
export class FindWineComponent implements OnInit {
  public pageNumber: number = 0;
  public wines: Wine[] | null = [];
  public winePageRes: WinePageRes | null = null;
  private subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>, private spinnerService: SpinnerService) {
  }

  ngOnInit() {
    this.spinnerService.setLoading(true);
    this.store.dispatch(new FindWineActions.FetchAllWines(this.pageNumber));
    this.subscription = this.store
      .select('findWinePage')
      .pipe(map((findWinePageState) => findWinePageState))
      .subscribe((findWineState) => {
        this.winePageRes = findWineState.winePage;
        this.wines = findWineState.wines;
        console.log(this)
      })
  }
}
