import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as FindWineActions from './store/find-wine.action'
import {map} from "rxjs/operators";
import {SpinnerService} from "../spinner/spinner.service";
import {Subscription} from "rxjs";
import {Wine} from "../Models/wine.model";
import {MainCoutriesEnum, OtherCountriesEnum} from "../enums/coutries-enum";
import {WineColorEnum} from "../enums/wine-color-enum";
import {FormControl, FormGroup} from "@angular/forms";
import {FindWineReq} from "../Models/findWineReq.model";
import {WinePage} from "../Models/winePage.model";
import {BasicProvincesEnum} from "../enums/basic-provinces-enum";

@Component({
  selector: 'app-find-wine',
  templateUrl: './find-wine.component.html',
  styleUrls: ['./find-wine.component.css']
})
export class FindWineComponent implements OnInit {

  public wineColorEnum = [WineColorEnum.RED, WineColorEnum.WHITE, WineColorEnum.ROSE, WineColorEnum.SPARKLING];
  public mainCoutriesEnum = MainCoutriesEnum;
  public otherCountriesEnum = OtherCountriesEnum;
  public basicProvincesEnum = BasicProvincesEnum;
  public basicVarieties: string[] = [];
  public basicWineries: string[] = [];

  public pickedColors: string[] = [];
  public pickedCountries: string[] = [];
  public pickedProvinces: string[] = [];
  public pickedVarieties: string[] = [];

  public pageNumber: number = 0;
  public wines: Wine[] = [];
  public winePageRes: WinePage | null = null;
  private subscription: Subscription;
  public isMorePicked: boolean = false;

  public filterForm = new FormGroup({
    wineColors: new FormControl<string[]>([]),
    countries: new FormControl<string[]>([]),
    varieties: new FormControl<string[]>([]),
    provinces: new FormControl<string[]>([]),
    price: new FormControl(),
    points: new FormControl(),
    sortOrder: new FormControl(''),
  })

  constructor(private store: Store<fromApp.AppState>, private spinnerService: SpinnerService) {
  }

  ngOnInit() {
    console.log(this.pageNumber)
    this.spinnerService.setLoading(true);
    this.store.dispatch(new FindWineActions.FetchWinePage({
      pageNumber: this.pageNumber,
      findWineReq: this.filterForm?.value as FindWineReq
    }));
    this.subscription = this.store
      .select('findWinePage')
      .pipe(map((findWinePageState) => findWinePageState))
      .subscribe((findWineState) => {
        this.winePageRes = findWineState.winePage;
        this.wines.push(...findWineState.wines);
        this.basicVarieties.push(...findWineState.varieties);
        this.basicWineries.push(...findWineState.wineries);
      })
  }

  onMorePicked() {
    this.isMorePicked = !this.isMorePicked;
  }

  selectCountry(wineCountry: string): void {
    if (this.pickedCountries.includes(wineCountry)) {
      this.pickedCountries.splice(this.pickedCountries.indexOf(wineCountry), 1);
      this.filterForm.controls.countries.setValue([...this.pickedCountries]);
      return;
    }
    this.filterForm.controls.countries.setValue([
      ...this.pickedCountries,
      wineCountry.charAt(0).toUpperCase() + wineCountry.slice(1)
    ]);
    this.pickedCountries = [...this.pickedCountries, wineCountry];
  }

  selectWineColor(wineColor: string): void {
    if (this.pickedColors.includes(wineColor)) {
      this.pickedColors.splice(this.pickedColors.indexOf(wineColor), 1);
      this.filterForm.controls.wineColors.setValue([...this.pickedColors]);
      return;
    }
    this.filterForm.controls.wineColors.setValue([...this.pickedColors, wineColor]);
    this.pickedColors = [...this.pickedColors, wineColor];
  }

  selectProvince(province: string): void {
    if (this.pickedProvinces.includes(province)) {
      this.pickedProvinces.splice(this.pickedProvinces.indexOf(province), 1);
      this.filterForm.controls.provinces.setValue([...this.pickedProvinces]);
      return;
    }
    this.filterForm.controls.wineColors.setValue([...this.pickedProvinces, province]);
    this.pickedProvinces = [...this.pickedProvinces, province];
  }

  selectVariety(variety: string): void {
    if (this.pickedVarieties.includes(variety)) {
      this.pickedVarieties.splice(this.pickedVarieties.indexOf(variety), 1);
      this.filterForm.controls.varieties.setValue([...this.pickedVarieties]);
      return;
    }
    this.filterForm.controls.varieties.setValue([...this.pickedVarieties, variety]);
    this.pickedVarieties = [...this.pickedVarieties, variety];
  }

  applyFilters() {
    this.pageNumber = 0;
    this.spinnerService.setLoading(true);
    console.log(this)
    console.log(this.filterForm.value)
    this.store.dispatch(new FindWineActions.FetchWinePage({
      pageNumber: this.pageNumber,
      findWineReq: this.filterForm.value as FindWineReq
    }));
  }

  clearFilterForm() {
    this.pickedProvinces = [];
    this.pickedVarieties = [];
    this.pickedColors = [];
    this.pickedCountries = [];
    this.filterForm.reset();
  }

  loadMore(pageNumber: number) {
    pageNumber += 1;
    this.spinnerService.setLoading(true);
    this.store.dispatch(new FindWineActions.FetchWinePage({
      pageNumber: pageNumber,
      findWineReq: this.filterForm.value as FindWineReq
    }));
  }

}
