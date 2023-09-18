import {Component, OnInit} from '@angular/core';
import {initFlowbite} from "flowbite";

@Component({
  selector: 'app-wine-carousel',
  templateUrl: './wine-carousel.component.html',
  styleUrls: ['./wine-carousel.component.css']
})
export class WineCarouselComponent implements OnInit {

  ngOnInit() {
    initFlowbite();
  }
}
