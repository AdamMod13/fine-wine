import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedWinePageComponent } from './recommended-wine-page.component';

describe('RecommendedWinePageComponent', () => {
  let component: RecommendedWinePageComponent;
  let fixture: ComponentFixture<RecommendedWinePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecommendedWinePageComponent]
    });
    fixture = TestBed.createComponent(RecommendedWinePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
