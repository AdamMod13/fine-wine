import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as FindWineActions from './store/find-wine.action'
import {map} from "rxjs/operators";
import {SpinnerService} from "../spinner/spinner.service";
import {Subscription} from "rxjs";
import {WinePageRes} from "../Models/winePageRes.model";
import {Wine} from "../Models/wine.model";
import {MainCoutriesEnum, OtherCountriesEnum} from "../enums/coutries-enum";
import {WineColorEnum} from "../enums/wine-color-enum";
import {BasicRegionsEnum} from "../enums/basic-regions-enum";
import {BasicVarietyEnum} from "../enums/basic-variety-enum";

@Component({
  selector: 'app-find-wine',
  templateUrl: './find-wine.component.html',
  styleUrls: ['./find-wine.component.css']
})
export class FindWineComponent implements OnInit {

  public wineColorEnum = [WineColorEnum.RED, WineColorEnum.WHITE, WineColorEnum.ROSE, WineColorEnum.SPARKLING];
  public mainCoutriesEnum = MainCoutriesEnum;
  public otherCountriesEnum = OtherCountriesEnum;
  public basicRegionsEnum = BasicRegionsEnum;
  public basicVarietyEnum = BasicVarietyEnum;

  public pickedColors: string[] = [];
  public pickedCountry: string[] = [];
  public pickedRegions: string[] = [];

  public pageNumber: number = 0;
  public wines: Wine[] | null = [];
  public winePageRes: WinePageRes | null = null;
  private subscription: Subscription;
  public isMorePicked: boolean = false;

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

  onMorePicked() {
    this.isMorePicked = !this.isMorePicked;
  }

  selectCountry(wineCountry: string): void {
    if (this.pickedCountry.includes(wineCountry)) {
      this.pickedCountry.splice(this.pickedCountry.indexOf(wineCountry), 1);
      return;
    }
    this.pickedCountry = [...this.pickedCountry, wineCountry];
  }

  selectWineColor(wineColor: string): void {
    if (this.pickedColors.includes(wineColor)) {
      this.pickedColors.splice(this.pickedColors.indexOf(wineColor), 1);
      return;
    }
    this.pickedColors = [...this.pickedColors, wineColor];
  }

  selectRegion(region: string): void {
    if (this.pickedRegions.includes(region)) {
      this.pickedRegions.splice(this.pickedRegions.indexOf(region), 1);
      return;
    }
    this.pickedRegions = [...this.pickedRegions, region];
  }

}
