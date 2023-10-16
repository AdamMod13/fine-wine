import {Actions, createEffect, ofType} from '@ngrx/effects';
import {debounceTime, switchMap, tap, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as RecommendationFormActions from './recommendation.action';
import {Wine} from "../../Models/wine.model";
import {SpinnerService} from "../../Shared/spinner/spinner.service";
import {Router} from "@angular/router";
import {catchError, map} from "rxjs/operators";
import {RecommendationModalFiltersRes} from "../../Models/recommendationModalFiltersRes.model";

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
      }),
      catchError(() => {
        const errorMessage = 'An error occurred while fetching recommendations.';
        this.spinnerService.setLoading(false);
        return throwError(errorMessage);
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
      }),
      catchError(() => {
        const errorMessage = 'An error occurred while saving recommendation.';
        this.spinnerService.setLoading(false);
        return throwError(errorMessage);
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
        }),
        catchError(() => {
          const errorMessage = 'An error occurred fetching current recommendation.';
          this.spinnerService.setLoading(false);
          return throwError(errorMessage);
        })
      );
    }
  );

  getRecommendationModalFilters = createEffect(() => {
      return this.actions$.pipe(
        ofType(RecommendationFormActions.GET_RECOMMENDATION_MODAL_FILTERS),
        switchMap(() => {
          this.spinnerService.setLoading(true);
          return this.http.get<RecommendationModalFiltersRes>(
            'http://localhost:8080/api/recommendation/get-filters'
          );
        }),
        map((recommendationFilters) => {
          return new RecommendationFormActions.SetRecommendationModalFilters(recommendationFilters);
        }),
        tap(() =>
          this.spinnerService.setLoading(false)
        ),
        catchError(() => {
          const errorMessage = 'An error occurred fetching getting modal filters.';
          this.spinnerService.setLoading(false);
          return throwError(errorMessage);
        })
      );
    }
  );

  searchWineryOrVariety = createEffect(() => {
      return this.actions$.pipe(
        debounceTime(500),
        ofType(RecommendationFormActions.SEARCH_WINERY_OR_VARIETY),
        switchMap((searchWineryOrVarietyRes: RecommendationFormActions.SearchWineryOrVariety) => {
          return this.http.post<RecommendationModalFiltersRes>(
            'http://localhost:8080/api/recommendation/search-winery-or-variety',
            searchWineryOrVarietyRes.payload
          );
        }),
        map((wineryOrVarietyRes) => {
          return new RecommendationFormActions.SetWineryOrVariety(wineryOrVarietyRes);
        })
      );
    }
  );

  constructor(private actions$: Actions, private http: HttpClient, private router: Router, private spinnerService: SpinnerService) {
  }
}
