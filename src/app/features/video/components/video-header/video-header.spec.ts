import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoHeader } from './video-header';

describe('VideoHeader', () => {
  let component: VideoHeader;
  let fixture: ComponentFixture<VideoHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
