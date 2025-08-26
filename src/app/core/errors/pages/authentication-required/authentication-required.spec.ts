import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationRequired } from './authentication-required';

describe('AuthenticationRequired', () => {
  let component: AuthenticationRequired;
  let fixture: ComponentFixture<AuthenticationRequired>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticationRequired]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticationRequired);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
