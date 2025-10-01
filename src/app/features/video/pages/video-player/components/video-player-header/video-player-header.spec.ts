import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPlayerHeader } from './video-player-header';

describe('VideoPlayerHeader', () => {
  let component: VideoPlayerHeader;
  let fixture: ComponentFixture<VideoPlayerHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoPlayerHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoPlayerHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
