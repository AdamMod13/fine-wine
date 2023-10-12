import {Component, ViewChild} from '@angular/core';
import {MainCoutriesEnum, OtherCountriesEnum} from "../../enums/coutries-enum";
import {WineColorEnum} from "../../enums/wine-color-enum";
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import * as RecommendationFormActions from "../store/recommendation.action";
import {WineRecommendationReq} from "../../Models/WineRecommendationReq.model";
import {SpinnerService} from "../../spinner/spinner.service";
import {map} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recommendation-form-modal',
  templateUrl: './recommendation-form-modal.component.html',
  styleUrls: ['./recommendation-form-modal.component.css']
})
export class RecommendationFormModalComponent {
  @ViewChild('rf') private recommendationFormDirective: NgForm;

  public wineColorEnum = [WineColorEnum.RED, WineColorEnum.WHITE, WineColorEnum.ROSE, WineColorEnum.SPARKLING];
  public mainCoutriesEnum = MainCoutriesEnum;
  public otherCountriesEnum = OtherCountriesEnum;
  public basicWineryOptions: string[] = [];
  public basicVarietyOptions: string[] = [];

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
    this.spinnerService.setLoading(true);
    this.store.dispatch(new RecommendationFormActions.GetRecommendationModalFilters())
    this.showRecommendationModal = true;
    this.subscription = this.store
      .select('recommendation')
      .pipe(map((recommendationModal) => recommendationModal))
      .subscribe((recommendationModalState) => {
        this.basicVarietyOptions.push(...recommendationModalState?.varietiesFilter);
        this.basicWineryOptions.push(...recommendationModalState?.wineriesFilter);
      })
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
    this.spinnerService.setLoading(true);
    this.pickedCountry = this.pickedCountry.map(country => {
      return (country.charAt(0).toUpperCase() + country.slice(1))
    })
    this.recommendationForm.controls['countries'].setValue([...this.pickedCountry]);
    const recommendationReq = this.recommendationForm.value as WineRecommendationReq;
    setTimeout(() => {
      this.showRecommendationModal = false;
    }, 1000)
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
}
