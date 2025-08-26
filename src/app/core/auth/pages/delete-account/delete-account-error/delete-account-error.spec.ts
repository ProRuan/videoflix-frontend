import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAccountError } from './delete-account-error';

describe('DeleteAccountError', () => {
  let component: DeleteAccountError;
  let fixture: ComponentFixture<DeleteAccountError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteAccountError]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAccountError);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
