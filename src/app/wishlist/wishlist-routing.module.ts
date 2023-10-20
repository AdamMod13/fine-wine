import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WishlistComponent} from "./wishlist.component";
import {AuthGuard} from "../auth/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: WishlistComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WishlistRoutingModule {
}
