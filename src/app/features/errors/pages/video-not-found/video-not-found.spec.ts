import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoNotFound } from './video-not-found';

describe('VideoNotFound', () => {
  let component: VideoNotFound;
  let fixture: ComponentFixture<VideoNotFound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoNotFound]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoNotFound);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
