import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {AuthInterceptorService} from './auth/auth-interceptor.service';
import {CountryCodePipe} from "./Shared/country-code.pipe";

@NgModule({
  imports: [],
  declarations: [CountryCodePipe],
  exports: [CountryCodePipe],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule {
}
