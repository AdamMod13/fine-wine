import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import {Subscription} from "rxjs";
import {SavedRecommendationsRes} from "../Models/savedRecommendationsRes.model";
import {WishlistService} from "../wishlist/wishlist.service";

@Component({
  selector: 'app-saved-recommendations',
  templateUrl: './saved-recommendations.component.html',
  styleUrls: ['./saved-recommendations.component.css']
})
export class SavedRecommendationsComponent implements OnInit {
  private subscription: Subscription;
  public savedRecommendations: SavedRecommendationsRes[] = [];

  constructor(private store: Store<fromApp.AppState>, public wishlistService: WishlistService) {
  }

  ngOnInit() {
    this.subscription = this.store
      .select('recommendation')
      .pipe()
      .subscribe((recommendation) => {
        if (recommendation.savedRecommendations.length !== 0) {
          this.savedRecommendations = [...recommendation.savedRecommendations];
          console.log(this.savedRecommendations)
        }
      })
  }
}
