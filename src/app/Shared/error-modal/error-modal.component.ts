import {Component} from '@angular/core';
import {ErrorModalService} from "./error-modal.service";

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent {
  constructor(public errorService: ErrorModalService) {
  }
}
