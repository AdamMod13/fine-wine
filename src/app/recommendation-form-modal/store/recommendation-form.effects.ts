import {Actions, createEffect, ofType} from '@ngrx/effects';
import {switchMap, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import * as RecommendationFormActions from './recommendation-form.action';
import {Wine} from "../../Models/wine.model";

@Injectable()
export class RecommendationFormEffects {
  fetchRecommendations = createEffect(() =>
    this.actions$.pipe(
      tap(action => console.log('Action received:', action)), // Add this line
      ofType(RecommendationFormActions.FETCH_RECOMMENDATIONS),
      switchMap((recommendationReq: RecommendationFormActions.FetchRecommendations) => {
        return this.http.post<Wine[]>(
          'http://localhost:8080/api/wine/get-recommendations',
          recommendationReq.payload
        );
      }),
      map((wines) => {
        return new RecommendationFormActions.SetRecommendations(wines);
      })
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {
  }
}
