import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityButton } from './quality-button';

describe('QualityButton', () => {
  let component: QualityButton;
  let fixture: ComponentFixture<QualityButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualityButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualityButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
