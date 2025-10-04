import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedButton } from './speed-button';

describe('SpeedButton', () => {
  let component: SpeedButton;
  let fixture: ComponentFixture<SpeedButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeedButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeedButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
