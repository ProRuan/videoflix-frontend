import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuteButton } from './mute-button';

describe('MuteButton', () => {
  let component: MuteButton;
  let fixture: ComponentFixture<MuteButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuteButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuteButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
