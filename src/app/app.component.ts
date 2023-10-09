import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromApp from "./store/app.reducer";
import {Dropdown, initTE, Input, Ripple, Select} from 'tw-elements';
import * as AuthActions from './auth/store/auth.actions';

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
    this.store.dispatch(new AuthActions.AutoLogin());
    initTE({Select, Input, Dropdown, Ripple})
  }
}
