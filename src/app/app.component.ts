import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromApp from "./store/app.reducer";

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
  }
}
