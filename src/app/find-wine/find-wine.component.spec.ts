import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindWineComponent } from './find-wine.component';

describe('FindWineComponent', () => {
  let component: FindWineComponent;
  let fixture: ComponentFixture<FindWineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FindWineComponent]
    });
    fixture = TestBed.createComponent(FindWineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
