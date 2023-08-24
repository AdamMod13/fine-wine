import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineCarouselComponent } from './wine-carousel.component';

describe('WineCarouselComponent', () => {
  let component: WineCarouselComponent;
  let fixture: ComponentFixture<WineCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WineCarouselComponent]
    });
    fixture = TestBed.createComponent(WineCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
