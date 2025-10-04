import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkipBackwardsButton } from './skip-backwards-button';

describe('SkipBackwardsButton', () => {
  let component: SkipBackwardsButton;
  let fixture: ComponentFixture<SkipBackwardsButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkipBackwardsButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkipBackwardsButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
