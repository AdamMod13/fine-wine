import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FindWineComponent} from "./find-wine.component";

const routes: Routes = [
  {
    path: '',
    component: FindWineComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindWineRoutingModule {
}
