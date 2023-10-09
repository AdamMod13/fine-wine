import {Component} from '@angular/core';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent {
  public errorMessage: string = '';
  public isErrorModalVisible: boolean = false;

  open(error: string) {
    this.errorMessage = error;
    this.isErrorModalVisible = true;
    setTimeout(() => {
      this.isErrorModalVisible = false
    }, 5000)
  }
}
