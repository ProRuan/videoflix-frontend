import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAccountSuccess } from './delete-account-success';

describe('DeleteAccountSuccess', () => {
  let component: DeleteAccountSuccess;
  let fixture: ComponentFixture<DeleteAccountSuccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteAccountSuccess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAccountSuccess);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
