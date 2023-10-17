import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgHeroiconsModule} from "@dimaslz/ng-heroicons";
import {CommonModule} from "@angular/common";
import {WishlistComponent} from "./wishlist.component";
import {WishlistRoutingModule} from "./wishlist-routing.module";
import {CoreModule} from "../core.module";

@NgModule({
  declarations: [WishlistComponent],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    NgHeroiconsModule,
    WishlistRoutingModule,
    FormsModule,
    CommonModule,
    CoreModule,
  ],
  exports: [],
  providers: [],
})
export class WishlistModule {
}
