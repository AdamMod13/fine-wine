import {Pipe, PipeTransform} from '@angular/core';
import {AllCountriesEnum} from "../enums/coutries-enum";

@Pipe({
  name: 'coutryCode'
})
export class CountryCodePipe implements PipeTransform {
  transform(country: string): string {
    return (AllCountriesEnum as { [key: string]: string })[country];
  }
}
