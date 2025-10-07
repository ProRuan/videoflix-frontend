import { TestBed } from '@angular/core/testing';

import { VideoDialogConfigurator } from './video-dialog-configurator';

describe('VideoDialogConfigurator', () => {
  let service: VideoDialogConfigurator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoDialogConfigurator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
