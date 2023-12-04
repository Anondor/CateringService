import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetProgramComponent } from './set-program.component';

describe('SetProgramComponent', () => {
  let component: SetProgramComponent;
  let fixture: ComponentFixture<SetProgramComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetProgramComponent]
    });
    fixture = TestBed.createComponent(SetProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
