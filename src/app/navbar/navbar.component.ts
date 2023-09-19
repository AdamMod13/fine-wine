import {Component, ViewChild} from '@angular/core';
import {Event, NavigationStart, Router} from "@angular/router";
import {WineColorEnum} from "../enums/wine-color-enum";
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import {MainCoutriesEnum} from "../enums/main-coutries-enum";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @ViewChild('rf') private recommendationFormDirective: NgForm;
  public recommendationForm: FormGroup;

  public showRecommendationModal: boolean = false;
  public isMainPage: boolean;
  public wineColorEnum = [WineColorEnum.RED, WineColorEnum.WHITE, WineColorEnum.ROSE, WineColorEnum.SPARKLING];
  public mainCoutriesEnum = MainCoutriesEnum;
  public pickedColors: string[] = [];

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.isMainPage = event.url === '/main-page' || event.url === '/';
      }
    })
  }

  initRecommendationForm(): void {
    this.showRecommendationModal = true;
    this.resetRecommendationForm();
    this.recommendationForm = new FormGroup({
      wineColor: new FormControl([]),
      maxPrice: new FormControl(15),
      country: new FormControl(''),
      variety: new FormControl(''),
      winery: new FormControl(''),
      points: new FormControl(85)
    })
  }

  selectWineColor(wineColor: string) {
    if (this.pickedColors.includes(wineColor)) {
      this.pickedColors.splice(this.pickedColors.indexOf(wineColor), 1);
      this.recommendationForm.controls['wineColor'].setValue([...this.pickedColors]);
      return;
    }
    this.recommendationForm.controls['wineColor'].setValue([...this.pickedColors, wineColor]);
    this.pickedColors = [...this.pickedColors, wineColor];
  }

  onSubmitRecommendationForm(): void {
    console.log(this)
    // this.recommendationFormDirective.resetForm();
    this.resetRecommendationForm();
  }

  resetRecommendationForm(): void {
    this.pickedColors = [];
    // this.recommendationForm.reset();
  }
}
