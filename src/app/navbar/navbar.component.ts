import {Component, OnInit, ViewChild} from '@angular/core';
import {Event, NavigationStart, Router} from "@angular/router";
import {
  RecommendationFormModalComponent
} from "../recommendation/recommendation-form-modal/recommendation-form-modal.component";
import {AuthComponent} from "../auth/auth.component";
import {Store} from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as AuthActions from '../auth/store/auth.actions';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild(RecommendationFormModalComponent) private recommendationFormModal: RecommendationFormModalComponent;
  @ViewChild(AuthComponent) private authModal: AuthComponent;

  private storeSub: Subscription;

  public isMainPage: boolean;
  public isUserLoggedIn: boolean = false;
  public isAccountDropdownOpen: boolean = false;

  constructor(private router: Router, private store: Store<fromApp.AppState>) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.isMainPage = event.url === '/main-page' || event.url === '/';
      }
    })
  }

  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      authState.user ? this.isUserLoggedIn = true : this.isUserLoggedIn = false;
    });
  }

  toggleAccountDropdown() {
    this.isAccountDropdownOpen = !this.isAccountDropdownOpen;
  }

  openAccountDropdown() {
    this.isAccountDropdownOpen = true;
  }

  closeAccountDropdown() {
    this.isAccountDropdownOpen = false;
  }

  logout() {
    this.store.dispatch(new AuthActions.Logout())
  }

  openRecommendationFormModal() {
    this.recommendationFormModal.initRecommendationForm();
  }

  openLoginModal() {
    this.authModal.openLoginModal();
  }

  openSignUpModal() {
    this.authModal.openSignUpModal();
  }
}
