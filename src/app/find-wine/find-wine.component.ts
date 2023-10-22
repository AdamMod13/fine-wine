import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as FindWineActions from './store/find-wine.action';
import {map} from "rxjs/operators";
import {SpinnerService} from "../Shared/spinner/spinner.service";
import {Subscription} from "rxjs";
import {Wine} from "../Models/wine.model";
import {MainCoutriesEnum, OtherCountriesEnum} from "../enums/coutries-enum";
import {WineColorEnum} from "../enums/wine-color-enum";
import {FormControl, FormGroup} from "@angular/forms";
import {FindWineReq} from "../Models/findWineReq.model";
import {WinePage} from "../Models/winePage.model";
import * as WishlistActions from "../wishlist/store/wishlist.action";
import {User} from "../auth/user.model";
import {WishlistService} from "../wishlist/wishlist.service";
import {ErrorModalService} from "../Shared/error-modal/error-modal.service";

@Component({
  selector: 'app-find-wine',
  templateUrl: './find-wine.component.html',
  styleUrls: ['./find-wine.component.css']
})
export class FindWineComponent implements OnInit, OnDestroy {

  public wineColorEnum = [WineColorEnum.RED, WineColorEnum.WHITE, WineColorEnum.ROSE, WineColorEnum.SPARKLING];
  public mainCoutriesEnum = MainCoutriesEnum;
  public otherCountriesEnum = OtherCountriesEnum;
  public basicVarieties: string[] = [];
  public basicWineries: string[] = [];

  public pickedColors: string[] = [];
  public pickedCountries: string[] = [];
  public pickedVarieties: string[] = [];
  public pickedWineries: string[] = [];

  public pageNumber: number = 0;
  public wines: Wine[] = [];
  public winePageRes: WinePage | null = null;
  public isMorePicked: boolean = false;

  public user: User;

  private subscription: Subscription;
  private authSubscription: Subscription;

  public filterForm = new FormGroup({
    wineColors: new FormControl<string[]>([]),
    countries: new FormControl<string[]>([]),
    varieties: new FormControl<string[]>([]),
    wineries: new FormControl<string[]>([]),
    price: new FormControl(),
    points: new FormControl(),
    sortOrder: new FormControl(''),
  })

  constructor(
    private store: Store<fromApp.AppState>,
    private spinnerService: SpinnerService,
    public wishlistService: WishlistService,
    public errorService: ErrorModalService
  ) {
  }

  ngOnInit() {
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
        if (findWineState.wines.length === 0) {
          if (findWineState.winePage) {
            this.errorService.open('For selected filters there is no wines.');
          }
          this.store.dispatch(new FindWineActions.FetchWinePage({pageNumber: 0, findWineReq: new FindWineReq()}));
        } else {
          this.wines = findWineState.wines;
        }
        this.basicVarieties = findWineState.varieties;
        this.basicWineries = findWineState.wineries;
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

  selectWinery(province: string): void {
    if (this.pickedWineries.includes(province)) {
      this.pickedWineries.splice(this.pickedWineries.indexOf(province), 1);
      this.filterForm.controls.wineries.setValue([...this.pickedWineries]);
      return;
    }
    this.filterForm.controls.wineries.setValue([...this.pickedWineries, province]);
    this.pickedWineries = [...this.pickedWineries, province];
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
    this.filterForm.controls.countries.setValue(this.pickedCountries.map(
      country => country.charAt(0).toUpperCase() + country.slice(1)
    ));
    this.store.dispatch(new FindWineActions.ClearWines());
    this.store.dispatch(new FindWineActions.FetchWinePage({
      pageNumber: this.pageNumber,
      findWineReq: this.filterForm.value as FindWineReq
    }));
  }

  clearFilterForm() {
    this.pickedWineries = [];
    this.pickedVarieties = [];
    this.pickedColors = [];
    this.pickedCountries = [];
    this.filterForm.reset({countries: [], wineries: [], varieties: [], wineColors: []});
  }

  loadMore() {
    this.pageNumber += 1;
    this.store.dispatch(new FindWineActions.FetchWinePage({
      pageNumber: this.pageNumber,
      findWineReq: this.filterForm.value as FindWineReq
    }));
  }

  ngOnDestroy() {
    this.store.dispatch(new WishlistActions.ClearFavourites());
    this.authSubscription.unsubscribe();
    this.subscription.unsubscribe()
  }
}
