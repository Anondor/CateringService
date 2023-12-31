import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamRegistrationComponent } from './team-registration.component';

describe('TeamRegistrationComponent', () => {
  let component: TeamRegistrationComponent;
  let fixture: ComponentFixture<TeamRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamRegistrationComponent]
    });
    fixture = TestBed.createComponent(TeamRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
