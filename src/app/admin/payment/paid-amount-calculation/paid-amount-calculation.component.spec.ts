import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidAmountCalculationComponent } from './paid-amount-calculation.component';

describe('PaidAmountCalculationComponent', () => {
  let component: PaidAmountCalculationComponent;
  let fixture: ComponentFixture<PaidAmountCalculationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaidAmountCalculationComponent]
    });
    fixture = TestBed.createComponent(PaidAmountCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
