import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorToastMobile } from './error-toast-mobile';

describe('ErrorToastMobile', () => {
  let component: ErrorToastMobile;
  let fixture: ComponentFixture<ErrorToastMobile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorToastMobile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorToastMobile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
