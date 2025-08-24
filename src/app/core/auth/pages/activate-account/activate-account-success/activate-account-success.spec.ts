import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateAccountSuccess } from './activate-account-success';

describe('ActivateAccountSuccess', () => {
  let component: ActivateAccountSuccess;
  let fixture: ComponentFixture<ActivateAccountSuccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivateAccountSuccess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivateAccountSuccess);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
