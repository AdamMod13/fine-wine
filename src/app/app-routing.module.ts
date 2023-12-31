import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  {
    path: '', redirectTo: '/main-page', pathMatch: 'full',
  },
  {
    path: 'main-page',
    loadChildren: () =>
      import('./main-page/main-page.module').then((m) => m.MainPageModule),
  },
  {
    path: 'find-wine',
    loadChildren: () =>
      import('./find-wine/find-wine.module').then((m) => m.FindWineModule),
  },
  {
    path: 'recommendations',
    loadChildren: () =>
      import('./recommendation/recommendation.module').then((m) => m.RecommendationModule)
  },
  {
    path: 'wishlist',
    loadChildren: () =>
      import('./wishlist/wishlist.module').then((m) => m.WishlistModule)
  },
  {
    path: 'saved-recommendations',
    loadChildren: () =>
      import('./saved-recommendations/saved-recommendations.module').then((m) => m.SavedRecommendationsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
