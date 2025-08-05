import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartEmailInput } from './start-email-input';

describe('StartEmailInput', () => {
  let component: StartEmailInput;
  let fixture: ComponentFixture<StartEmailInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartEmailInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartEmailInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
