import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybackRateButton } from './playback-rate-button';

describe('PlaybackRateButton', () => {
  let component: PlaybackRateButton;
  let fixture: ComponentFixture<PlaybackRateButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaybackRateButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaybackRateButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
