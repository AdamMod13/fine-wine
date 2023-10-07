import {Actions, createEffect, ofType} from '@ngrx/effects';
import {switchMap, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as RecommendationFormActions from './recommendation.action';
import {Wine} from "../../Models/wine.model";
import {SpinnerService} from "../../spinner/spinner.service";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";

@Injectable()
export class RecommendationEffects {
  fetchRecommendations = createEffect(() =>
    this.actions$.pipe(
      ofType(RecommendationFormActions.FETCH_RECOMMENDATIONS),
      switchMap((recommendationReq: RecommendationFormActions.FetchRecommendations) => {
        return this.http.post<Wine[]>(
          'http://localhost:8080/api/wine/get-recommendations',
          recommendationReq.payload
        );
      }),
      map((wines) => {
        return new RecommendationFormActions.SaveCurrentRecommendations(wines);
      }),
      tap(() => {
        this.spinnerService.setLoading(false);
        this.router.navigate(['/recommendations'])
      })
    ),
  );

  saveCurrentRecommendations = createEffect(() =>
    this.actions$.pipe(
      ofType(RecommendationFormActions.SAVE_CURRENT_RECOMMENDATIONS),
      switchMap((currentRecommendations: RecommendationFormActions.SaveCurrentRecommendations) => {
        return this.http.post<Wine[]>(
          'http://localhost:8080/api/wine/save-current-recommendations',
          currentRecommendations.payload
        );
      }),
      map(() => {
        return new RecommendationFormActions.GetCurrentRecommendations();
      })
    ),
  );

  getCurrentRecommendations = createEffect(() => {
      return this.actions$.pipe(
        ofType(RecommendationFormActions.GET_CURRENT_RECOMMENDATIONS),
        switchMap(() => {
          return this.http.get<Wine[]>(
            'http://localhost:8080/api/wine/get-current-recommendations'
          );
        }),
        map((wines) => {
          return new RecommendationFormActions.SetRecommendations(wines);
        })
      );
    }
  );

  constructor(private actions$: Actions, private http: HttpClient, private router: Router, private spinnerService: SpinnerService) {
  }
}
