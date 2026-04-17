import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutSessions } from './check-out-sessions';

describe('CheckOutSessions', () => {
  let component: CheckOutSessions;
  let fixture: ComponentFixture<CheckOutSessions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckOutSessions],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckOutSessions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
