import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpSuccessfulDialog } from './sign-up-successful-dialog';

describe('SignUpSuccessfulDialog', () => {
  let component: SignUpSuccessfulDialog;
  let fixture: ComponentFixture<SignUpSuccessfulDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpSuccessfulDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpSuccessfulDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
