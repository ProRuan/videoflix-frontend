import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordSuccessDialog } from './forgot-password-success-dialog';

describe('ForgotPasswordSuccessDialog', () => {
  let component: ForgotPasswordSuccessDialog;
  let fixture: ComponentFixture<ForgotPasswordSuccessDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPasswordSuccessDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordSuccessDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
