import {Component, ViewChild} from '@angular/core';
import {Event, NavigationStart, Router} from "@angular/router";
import {RecommendationFormModalComponent} from "../recommendation-form-modal/recommendation-form-modal.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @ViewChild(RecommendationFormModalComponent) private recommendationFormModal: RecommendationFormModalComponent;

  public isMainPage: boolean;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.isMainPage = event.url === '/main-page' || event.url === '/';
      }
    })
  }

  openRecommendationFormModal() {
    this.recommendationFormModal.initRecommendationForm();
  }
}
