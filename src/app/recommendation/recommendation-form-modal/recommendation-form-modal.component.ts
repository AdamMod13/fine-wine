import {Component, OnDestroy, ViewChild} from '@angular/core';
import {MainCoutriesEnum, OtherCountriesEnum} from "../../enums/coutries-enum";
import {WineColorEnum} from "../../enums/wine-color-enum";
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import * as RecommendationFormActions from "../store/recommendation.action";
import {WineRecommendationReq} from "../../Models/WineRecommendationReq.model";
import {SpinnerService} from "../../Shared/spinner/spinner.service";
import {map} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recommendation-form-modal',
  templateUrl: './recommendation-form-modal.component.html',
  styleUrls: ['./recommendation-form-modal.component.css']
})
export class RecommendationFormModalComponent implements OnDestroy {
  @ViewChild('rf') private recommendationFormDirective: NgForm;

  public wineColorEnum = [WineColorEnum.RED, WineColorEnum.WHITE, WineColorEnum.ROSE, WineColorEnum.SPARKLING];
  public mainCoutriesEnum = MainCoutriesEnum;
  public otherCountriesEnum = OtherCountriesEnum;
  public basicWineryFilter: string[] = [];
  public basicVarietyFilter: string[] = [];
  public isFirstData: boolean = true;
  public filteredWinery: string[] = [];
  public filteredVariety: string[] = [];
  public isOpenedFirst: boolean = true;

  public varietySearch: string;
  public winerySearch: string;

  public showRecommendationModal: boolean = false;
  public isMorePicked: boolean = false;
  public pickedColors: string[] = [];
  public pickedCountry: string[] = [];

  private subscription: Subscription;

  public recommendationForm = new FormGroup({
    wineColors: new FormControl<string[]>([]),
    maxPrice: new FormControl<number | null>(null),
    countries: new FormControl<string[]>([]),
    variety: new FormControl<string>(''),
    winery: new FormControl<string>(''),
    points: new FormControl<number>(85)
  });

  constructor(private store: Store<fromApp.AppState>, private spinnerService: SpinnerService) {
  }

  initRecommendationForm(): void {
    this.initSelectListeners();
    this.store.dispatch(new RecommendationFormActions.GetRecommendationModalFilters())
    this.showRecommendationModal = true;
    this.subscription = this.store
      .select('recommendation')
      .pipe(map((recommendationModal) => recommendationModal))
      .subscribe((recommendationModalState) => {
        console.log(recommendationModalState)
        if (
          this.isFirstData
          && recommendationModalState.wineriesFilter.length !== 0
          && recommendationModalState.varietiesFilter.length !== 0
        ) {
          this.basicVarietyFilter = recommendationModalState?.varietiesFilter;
          this.basicWineryFilter = recommendationModalState?.wineriesFilter;
          this.isFirstData = false;
        }
        if (this.varietySearch && this.varietySearch === '' && recommendationModalState.filterType === "VARIETY") {
          this.filteredVariety = [...this.basicVarietyFilter];
          return;
        }
        if (this.winerySearch === '' || !this.winerySearch && recommendationModalState.filterType === "WINERY") {
          this.filteredWinery = [...this.basicWineryFilter];
          return;
        }
        console.log("AFTER")
        this.filteredVariety = recommendationModalState?.varietiesFilter;
        this.filteredWinery = recommendationModalState?.wineriesFilter;
      })
  }

  initSelectListeners() {
    const varietySelect = document.getElementById('varietySelect');
    if (varietySelect) {
      varietySelect.addEventListener('open.te.select', () => {
        setTimeout(() => {
          let varietySelect = document.querySelectorAll(
            'input[data-te-select-input-filter-ref]')[this.isOpenedFirst ? 0 : 1] as HTMLInputElement;
          varietySelect.addEventListener('input', () => {
            this.varietySearch = varietySelect.value;
            this.store.dispatch(new RecommendationFormActions.SearchWineryOrVariety({
              value: varietySelect.value,
              type: "VARIETY"
            }));
            if (this.isOpenedFirst) {
              this.isOpenedFirst = false
            }
          })
        }, 100)
      });
      varietySelect.addEventListener('close.te.select', () => {
        this.filteredVariety = [...this.basicVarietyFilter];
        this.isOpenedFirst = true;
      })
    }
    const winerySelect = document.getElementById('winerySelect');
    if (winerySelect) {
      winerySelect.addEventListener('open.te.select', () => {
        setTimeout(() => {
          let winerySelect = document.querySelectorAll(
            'input[data-te-select-input-filter-ref]')[this.isOpenedFirst ? 0 : 1] as HTMLInputElement;
          winerySelect.addEventListener('input', () => {
            this.winerySearch = winerySelect.value;
            this.store.dispatch(new RecommendationFormActions.SearchWineryOrVariety({
              value: winerySelect.value,
              type: "WINERY"
            }));
            if (this.isOpenedFirst) {
              this.isOpenedFirst = false
            }
          })
        }, 100)
      });
      winerySelect.addEventListener('close.te.select', () => {
        this.filteredWinery = [...this.basicWineryFilter];
        this.isOpenedFirst = true;
      });
    }
  }

  selectWineColor(wineColor: string): void {
    if (this.pickedColors.includes(wineColor)) {
      this.pickedColors.splice(this.pickedColors.indexOf(wineColor), 1);
      this.recommendationForm.controls.countries.setValue([...this.pickedColors]);
      return;
    }
    this.recommendationForm.controls['wineColors'].setValue([...this.pickedColors, wineColor]);
    this.pickedColors = [...this.pickedColors, wineColor];
  }

  selectCountry(wineCountry: string): void {
    if (this.pickedCountry.includes(wineCountry)) {
      this.pickedCountry.splice(this.pickedCountry.indexOf(wineCountry), 1);
      this.recommendationForm.controls['countries'].setValue([...this.pickedCountry]);
      return;
    }
    this.recommendationForm.controls['countries'].setValue([...this.pickedCountry, wineCountry]);
    this.pickedCountry = [...this.pickedCountry, wineCountry];
  }

  onMorePicked() {
    this.isMorePicked = !this.isMorePicked;
  }

  onSubmitRecommendationForm(): void {
    this.pickedCountry = this.pickedCountry.map(country => {
      return (country.charAt(0).toUpperCase() + country.slice(1))
    })
    this.recommendationForm.controls['countries'].setValue([...this.pickedCountry]);
    const recommendationReq = this.recommendationForm.value as WineRecommendationReq;
    setTimeout(() => {
      this.showRecommendationModal = false;
    }, 1000)
    console.log(recommendationReq)
    this.store.dispatch(new RecommendationFormActions.FetchRecommendations(recommendationReq));
    this.resetRecommendationForm();
  }

  closeRecommendationForm() {
    this.clearForm();
    this.showRecommendationModal = false;
  }

  clearForm() {
    this.resetRecommendationForm();
  }

  resetRecommendationForm(): void {
    this.pickedColors = [];
    this.pickedCountry = [];
    this.isMorePicked = false;

    this.recommendationForm.reset({maxPrice: null, points: 85});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
