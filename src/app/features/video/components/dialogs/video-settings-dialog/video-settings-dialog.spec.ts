import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoSettingsDialog } from './video-settings-dialog';

describe('VideoSettingsDialog', () => {
  let component: VideoSettingsDialog;
  let fixture: ComponentFixture<VideoSettingsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoSettingsDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoSettingsDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
