import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpSuccessDialog } from './sign-up-success-dialog';

describe('SignUpSuccessDialog', () => {
  let component: SignUpSuccessDialog;
  let fixture: ComponentFixture<SignUpSuccessDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpSuccessDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpSuccessDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
