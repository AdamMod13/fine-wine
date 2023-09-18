import {Component} from '@angular/core';
import {Event, NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  public isMainPage: boolean;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.isMainPage = event.url === '/main-page' || event.url === '/';
      }
    })
  }
}
