import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPlayerMultiBar } from './video-player-multi-bar';

describe('VideoPlayerMultiBar', () => {
  let component: VideoPlayerMultiBar;
  let fixture: ComponentFixture<VideoPlayerMultiBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoPlayerMultiBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoPlayerMultiBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
