import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedRecommendationsComponent } from './saved-recommendations.component';

describe('SavedRecommendationsComponent', () => {
  let component: SavedRecommendationsComponent;
  let fixture: ComponentFixture<SavedRecommendationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavedRecommendationsComponent]
    });
    fixture = TestBed.createComponent(SavedRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
