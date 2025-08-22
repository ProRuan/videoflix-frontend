import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordError } from './reset-password-error';

describe('ResetPasswordError', () => {
  let component: ResetPasswordError;
  let fixture: ComponentFixture<ResetPasswordError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPasswordError]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordError);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
