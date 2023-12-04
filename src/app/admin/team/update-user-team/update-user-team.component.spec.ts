import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserTeamComponent } from './update-user-team.component';

describe('UpdateUserTeamComponent', () => {
  let component: UpdateUserTeamComponent;
  let fixture: ComponentFixture<UpdateUserTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateUserTeamComponent]
    });
    fixture = TestBed.createComponent(UpdateUserTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
