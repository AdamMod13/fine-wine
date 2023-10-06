import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationFormModalComponent } from './recommendation-form-modal.component';

describe('RecommendationFormModalComponent', () => {
  let component: RecommendationFormModalComponent;
  let fixture: ComponentFixture<RecommendationFormModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecommendationFormModalComponent]
    });
    fixture = TestBed.createComponent(RecommendationFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
