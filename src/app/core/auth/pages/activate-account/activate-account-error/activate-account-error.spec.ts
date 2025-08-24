import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateAccountError } from './activate-account-error';

describe('ActivateAccountError', () => {
  let component: ActivateAccountError;
  let fixture: ComponentFixture<ActivateAccountError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivateAccountError]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivateAccountError);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
