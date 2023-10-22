import {Component, OnDestroy, ViewChild} from '@angular/core';
import {MainCoutriesEnum, OtherCountriesEnum} from "../../enums/coutries-enum";
import {WineColorEnum} from "../../enums/wine-color-enum";
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import * as RecommendationFormActions from "../store/recommendation.action";
import {WineRecommendationReq} from "../../Models/wineRecommendationReq.model";
import {Subscription} from "rxjs";
import {Wine} from "../../Models/wine.model";
import {FindWineReq} from "../../Models/findWineReq.model";

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
  public wines: Wine[] = [];
  public filterWineReq: FindWineReq = new FindWineReq();

  public wineSearch: string;

  public showRecommendationModal: boolean = false;
  public isMorePicked: boolean = false;
  public pickedColors: string[] = [];
  public pickedCountry: string[] = [];

  private subscription: Subscription;

  public recommendationForm = new FormGroup({
    wineColors: new FormControl<string[]>([]),
    maxPrice: new FormControl<number | null>(null),
    countries: new FormControl<string[]>([]),
    mainWine: new FormControl<number | null>(null),
    points: new FormControl<number>(85)
  });

  constructor(private store: Store<fromApp.AppState>) {
  }

  initRecommendationForm(): void {
    this.initSelectListeners();
    this.store.dispatch(new RecommendationFormActions.GetWinesSelectOptions(new FindWineReq()))
    this.showRecommendationModal = true;
    this.subscription = this.store
      .select('recommendation')
      .pipe()
      .subscribe((recommendationModalState) => {
        this.wines = [...recommendationModalState.winesSelectOptions];
        this.wineSearch = '';
      });
  }

  initSelectListeners() {
    const wineSelectElement = document.getElementById('wineSelect');
    if (wineSelectElement) {
      wineSelectElement.addEventListener('open.te.select', () => {
        setTimeout(() => {
          let wineSelect = document.querySelectorAll(
            'input[data-te-select-input-filter-ref]')[0] as HTMLInputElement;
          wineSelect.addEventListener('input', () => {
            this.wineSearch = wineSelect.value;
            this.sendWineFilterReq();
          })
        }, 100)
      });
    }
  }

  selectWineColor(wineColor: string): void {
    if (this.pickedColors.includes(wineColor)) {
      this.pickedColors.splice(this.pickedColors.indexOf(wineColor), 1);
      this.recommendationForm.controls.wineColors.setValue([...this.pickedColors]);
      this.sendWineFilterReq();
      return;
    }
    this.recommendationForm.controls['wineColors'].setValue([...this.pickedColors, wineColor]);
    this.pickedColors = [...this.pickedColors, wineColor];
    this.sendWineFilterReq();
  }

  selectCountry(wineCountry: string): void {
    if (this.pickedCountry.includes(wineCountry)) {
      this.pickedCountry.splice(this.pickedCountry.indexOf(wineCountry), 1);
      this.recommendationForm.controls['countries'].setValue([...this.pickedCountry]);
      this.sendWineFilterReq();
      return;
    }
    this.recommendationForm.controls['countries'].setValue([...this.pickedCountry, wineCountry]);
    this.pickedCountry = [...this.pickedCountry, wineCountry];
    this.sendWineFilterReq();
  }

  sendWineFilterReq() {
    this.filterWineReq = {
      ...this.filterWineReq,
      countries: [
        ...this.pickedCountry.map(country => {
          return (country.charAt(0).toUpperCase() + country.slice(1))
        })
      ],
      winerySearchString: this.wineSearch,
      wineColors: [...this.pickedColors],
    }
    this.store.dispatch(new RecommendationFormActions.GetWinesSelectOptions(this.filterWineReq));
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
    if (this.recommendationForm.controls.mainWine.value) {
      recommendationReq.pickedWineId = this.recommendationForm.controls.mainWine.value;
      this.store.dispatch(new RecommendationFormActions.FetchRecommendations(recommendationReq));
    }
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
