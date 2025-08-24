import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactivateAccount } from './reactivate-account';

describe('ReactivateAccount', () => {
  let component: ReactivateAccount;
  let fixture: ComponentFixture<ReactivateAccount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactivateAccount]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactivateAccount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
