import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorModalService {
  public errorMessage: string = '';
  public isErrorModalVisible: boolean = false;

  constructor() {
  }

  open(error: string) {
    this.errorMessage = error;
    this.isErrorModalVisible = true;
    setTimeout(() => {
      this.isErrorModalVisible = false
    }, 5000)
  }
}
