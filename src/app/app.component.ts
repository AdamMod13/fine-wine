import {Component, OnInit} from '@angular/core';
import {initFlowbite} from "flowbite";
import {Store} from "@ngrx/store";
import * as fromApp from "./store/app.reducer";
import * as MainPageActions from "./main-page/store/main-page.action";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'fine-wine';

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new MainPageActions.FetchBestRandomWines());

    initFlowbite();
  }
}
