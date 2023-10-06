import {Component, ViewChild} from '@angular/core';
import {Event, NavigationStart, Router} from "@angular/router";
import {WineColorEnum} from "../enums/wine-color-enum";
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import {MainCoutriesEnum, OtherCountriesEnum} from "../enums/coutries-enum";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @ViewChild('rf') private recommendationFormDirective: NgForm;

  public wineColorEnum = [WineColorEnum.RED, WineColorEnum.WHITE, WineColorEnum.ROSE, WineColorEnum.SPARKLING];
  public mainCoutriesEnum = MainCoutriesEnum;
  public otherCountriesEnum = OtherCountriesEnum;

  public showRecommendationModal: boolean = false;
  public isMorePicked: boolean = false;
  public isMainPage: boolean;
  public pickedColors: string[] = [];
  public pickedCountry: string[] = [];

  public recommendationForm = new FormGroup({
    wineColor: new FormControl<string[]>([]),
    maxPrice: new FormControl<number | null>(null),
    country: new FormControl<string[]>([]),
    variety: new FormControl<string>(''),
    winery: new FormControl<string>(''),
    points: new FormControl<number>(85)
  });

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.isMainPage = event.url === '/main-page' || event.url === '/';
      }
    })
  }

  initRecommendationForm(): void {
    this.showRecommendationModal = true;
  }

  selectWineColor(wineColor: string): void {
    if (this.pickedColors.includes(wineColor)) {
      this.pickedColors.splice(this.pickedColors.indexOf(wineColor), 1);
      this.recommendationForm.controls.wineColor.setValue([...this.pickedColors]);
      return;
    }
    this.recommendationForm.controls['wineColor'].setValue([...this.pickedColors, wineColor]);
    this.pickedColors = [...this.pickedColors, wineColor];
  }

  selectCountry(wineCountry: string): void {
    if (this.pickedCountry.includes(wineCountry)) {
      this.pickedCountry.splice(this.pickedCountry.indexOf(wineCountry), 1);
      this.recommendationForm.controls['country'].setValue([...this.pickedCountry]);
      return;
    }
    this.recommendationForm.controls['country'].setValue([...this.pickedCountry, wineCountry]);
    this.pickedCountry = [...this.pickedCountry, wineCountry];
  }

  onMorePicked() {
    this.isMorePicked = !this.isMorePicked;
  }

  onSubmitRecommendationForm(): void {
    console.log(this.recommendationForm.controls.maxPrice.value)
    this.recommendationForm.controls['country'].setValue([...this.pickedCountry]);
    // this.recommendationFormDirective.resetForm();
    this.resetRecommendationForm();
  }

  clearForm() {
    this.resetRecommendationForm();
  }

  resetRecommendationForm(): void {
    this.pickedColors = [];
    this.pickedCountry = [];
    this.isMorePicked = false;

    this.recommendationForm.reset({maxPrice: 15, points: 85});
  }
}
