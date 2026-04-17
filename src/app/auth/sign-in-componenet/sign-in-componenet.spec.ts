import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponenet } from './sign-in-componenet';

describe('SignInComponenet', () => {
  let component: SignInComponenet;
  let fixture: ComponentFixture<SignInComponenet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInComponenet],
    }).compileComponents();

    fixture = TestBed.createComponent(SignInComponenet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
