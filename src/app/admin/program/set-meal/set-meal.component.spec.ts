import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetMealComponent } from './set-meal.component';

describe('SetMealComponent', () => {
  let component: SetMealComponent;
  let fixture: ComponentFixture<SetMealComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetMealComponent]
    });
    fixture = TestBed.createComponent(SetMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
