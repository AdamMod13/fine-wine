import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AuthComponent} from './auth.component';
import {NgHeroiconsModule} from "@dimaslz/ng-heroicons";

@NgModule({
  declarations: [AuthComponent],
  exports: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgHeroiconsModule,
  ]
})
export class AuthModule {
}
