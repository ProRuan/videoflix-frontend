import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordSuccessDialog } from './reset-password-success-dialog';

describe('ResetPasswordSuccessDialog', () => {
  let component: ResetPasswordSuccessDialog;
  let fixture: ComponentFixture<ResetPasswordSuccessDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPasswordSuccessDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordSuccessDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
